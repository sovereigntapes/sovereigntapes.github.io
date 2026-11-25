// Supabase backend for SovereignTapes. Exposes the small API app.js uses:
// db (collections with live snapshots), assets (file storage), user, downloads, plus auth helpers.
window.Backend = (() => {
  const cfg = window.APP_CONFIG || {};
  const configured = !!(cfg.SUPABASE_URL && !cfg.SUPABASE_URL.includes('YOUR_') && window.supabase);
  const recovery = /(^|[#&])type=(recovery|invite)(&|$)/.test(location.hash); // came from a reset-password or invite email link: ask for a password
  const sb = configured ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY) : null;
  let session = null, mfaPending = false;
  // Two-step sign-in: a password-only session counts as signed out until the authenticator code is entered.
  const checkMfa = async () => { mfaPending = false; if (!session) return;
    const { data } = await sb.auth.mfa.getAuthenticatorAssuranceLevel(); mfaPending = data?.nextLevel === 'aal2' && data.currentLevel !== 'aal2'; };
  const ready = sb ? sb.auth.getSession().then(async r => { session = r.data.session; await checkMfa(); if (session && !mfaPending) await ensureProfile(); }).catch(() => {}) : Promise.resolve();
  if (sb) sb.auth.onAuthStateChange((_e, s) => { session = s; });
  const uid = () => (mfaPending ? null : session?.user?.id) || null;
  const rid = () => (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + Date.now().toString(36)).replace(/-/g, '').slice(0, 20);
  const fail = (e, code) => Object.assign(new Error(e?.message || String(e)), { code: code || e?.code });
  const url = id => sb ? sb.storage.from('media').getPublicUrl(id).data.publicUrl : '';

  const tables = new Map();
  function collection(table) {
    if (tables.has(table)) return tables.get(table);
    const subs = new Set();
    let chan = null, timer = 0;
    async function fetchAll() {
      const rows = [];
      for (let from = 0; ; from += 1000) {
        const { data, error } = await sb.from(table).select('id,data').range(from, from + 999);
        if (error) throw error;
        rows.push(...data);
        if (data.length < 1000) break;
      }
      return rows.map(r => ({ id: r.id, exists: true, data: () => r.data }));
    }
    function emit() {
      clearTimeout(timer);
      timer = setTimeout(async () => {
        try { const docs = await fetchAll(); subs.forEach(s => s.next({ docs })); }
        catch (e) { subs.forEach(s => s.error && s.error(fail(e, 'unavailable'))); }
      }, table === 'stats' ? 2500 : 120);
    }
    const api = {
      doc(id = rid()) {
        return {
          id,
          async set(data) { const { error } = await sb.from(table).upsert({ id, data }); if (error) throw fail(error); emit(); },
          async update(data) { const { error } = await sb.from(table).update({ data }).eq('id', id); if (error) throw fail(error); emit(); },
          async delete() { const { error } = await sb.from(table).delete().eq('id', id); if (error) throw fail(error); emit(); }
        };
      },
      onSnapshot(next, error) {
        const s = { next, error };
        subs.add(s);
        if (!chan) chan = sb.channel('t_' + table).on('postgres_changes', { event: '*', schema: 'public', table }, emit).subscribe();
        emit();
        return () => subs.delete(s);
      }
    };
    tables.set(table, api);
    return api;
  }

  const assets = {
    async upload(blob) {
      const u = uid();
      if (!u) throw fail('Sign in first', 'not_granted');
      if (blob.size > 50 * 1024 * 1024) throw fail('File over 50 MB', 'too_large');
      const ext = ((blob.name || '').split('.').pop() || (blob.type || '').split('/')[1] || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin';
      const path = `${u}/${rid()}.${ext}`;
      const { error } = await sb.storage.from('media').upload(path, blob, { contentType: blob.type || undefined, cacheControl: '31536000' });
      if (error) throw fail(error, /size|large|exceed/i.test(error.message) ? 'too_large' : undefined);
      return { id: path, url: url(path) };
    },
    async delete(id) { if (id.startsWith('vault/')) await sb.storage.from('vault').remove([id.slice(6)]); else await sb.storage.from('media').remove([id]); },
    // Members-only audio: private bucket, ids look like "vault/<artistId>/<file>"
    async uploadProfile(blob) { // profile photo or cover: images only, into <uid>/profile/
      const u = uid();
      if (!u) throw fail('Sign in first', 'not_granted');
      const ext = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }[blob.type];
      if (!ext) throw fail('Use a JPG, PNG or WebP image');
      if (blob.size > 5 * 1024 * 1024) throw fail('Image over 5 MB', 'too_large');
      const path = `${u}/profile/${rid()}.${ext}`;
      const { error } = await sb.storage.from('media').upload(path, blob, { contentType: blob.type, cacheControl: '31536000' });
      if (error) throw fail(error);
      return { id: path, url: url(path) };
    },
    async uploadVault(blob) {
      const u = uid(); if (!u) throw fail('Sign in first', 'not_granted');
      if (blob.size > 50 * 1024 * 1024) throw fail('File over 50 MB', 'too_large');
      const ext = ((blob.name || '').split('.').pop() || 'bin').toLowerCase().replace(/[^a-z0-9]/g, '') || 'bin', path = `${u}/${rid()}.${ext}`;
      const { error } = await sb.storage.from('vault').upload(path, blob, { contentType: blob.type || undefined });
      if (error) throw fail(error); return { id: 'vault/' + path };
    }
  };

  const user = {
    id: async () => uid(),
    canEdit: async () => false,
    async me() { const u = uid(); if (!u) return { name: '', role: 'guest' };
      const { data } = await sb.from('profiles').select('data').eq('id', u).maybeSingle();
      return { name: data?.data?.name || session.user.user_metadata?.name || '', role: data?.data?.role || 'fan' }; },
    async setRole(role) { const u = uid(); const p = await user.me(); const { data: cur } = await sb.from('profiles').select('data').eq('id', u).maybeSingle(); const { error } = await sb.from('profiles').upsert({ id: u, data: { ...(cur?.data || {}), name: p.name, role } }); if (error) throw fail(error); },
    email: () => session?.user?.email || '',
    async profiles(ids) {
      const out = {};
      if (!ids.length) return out;
      const { data } = await sb.from('profiles').select('id,data').in('id', ids);
      (data || []).forEach(r => { out[r.id] = { name: r.data?.name || '' }; });
      return out;
    }
  };

  const toB64 = blob => new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result.slice(r.result.indexOf(',') + 1)); r.onerror = () => no(r.error); r.readAsDataURL(blob); });
  // Saves a real file. Phones: public Documents/<folder> (visible in the Files app and over USB/Finder/iTunes).
  // Desktop and web: the normal download/save dialog. Large files are written in chunks to keep memory low.
  const isNative = () => !!window.Capacitor?.isNativePlatform?.();
  const downloads = {
    async save({ filename, data, folder = 'SovereignTapes' }) {
      const blob = data instanceof Blob ? data : new Blob([data]);
      const Cap = window.Capacitor;
      if (isNative() && Cap.Plugins?.Filesystem) {
        const FS = Cap.Plugins.Filesystem, path = folder.replace(/[\:*?"<>|]/g, '') + '/' + filename.replace(/[\/:*?"<>|]/g, '');
        if (Cap.getPlatform?.() === 'android') { try { const p = await FS.checkPermissions(); if (p.publicStorage !== 'granted') await FS.requestPermissions(); } catch {} }
        const CH = 3 * 1024 * 1024; // multiple of 3 keeps base64 chunks aligned
        for (let o = 0; o < blob.size || o === 0; o += CH) {
          const part = await toB64(blob.slice(o, o + CH));
          if (o === 0) await FS.writeFile({ path, data: part, directory: 'DOCUMENTS', recursive: true });
          else await FS.appendFile({ path, data: part, directory: 'DOCUMENTS' });
          if (blob.size === 0) break;
        }
        return { where: (Cap.getPlatform?.() === 'ios' ? 'Files app › On My iPhone › SovereignTapes › ' : 'Documents › ') + path };
      }
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob); a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 60000);
      return { where: 'your Downloads folder' };
    }
  };

  async function ensureProfile() {
    const u = uid(); if (!u) return;
    const { data } = await sb.from('profiles').select('id').eq('id', u).maybeSingle();
    if (data) return;
    const m = session.user.user_metadata || {};
    await sb.from('profiles').insert({ id: u, data: { name: m.name || session.user.email.split('@')[0], role: m.role === 'artist' ? 'artist' : 'fan' } });
  }

  return {
    configured, url, isNative,
    async signed(id) { const { data, error } = await sb.storage.from('vault').createSignedUrl(id.slice(6), 3600); if (error || !data) throw fail(error || 'Members only', 'members'); return data.signedUrl; },
    async pay(action, body = {}) { const { data, error } = await sb.functions.invoke('pay', { body: { action, ...body } });
      if (error) { let m = error.message; try { m = (await error.context.json()).error || m; } catch {} throw fail(m); } if (data?.error) throw fail(data.error); return data; }, online: () => navigator.onLine, sb, ready, recovery: () => recovery, mfaPending: () => mfaPending, email: () => session?.user?.email || '',
    async use(name) {
      await ready;
      if (!sb) return null;
      if (name === 'db') return { collection, rpc: async (fn, args) => { const { data, error } = await sb.rpc(fn, args); if (error) throw fail(error); return data; } };
      if (name === 'assets') return uid() ? assets : null;
      if (name === 'user') return user;
      if (name === 'downloads') return downloads;
      return null;
    },
    async signIn(email, password) {
      // "name@site.com" signs in by email; "@yourname" or "yourname" signs in by @username (looked up on the server)
      let data, error;
      if (email.includes('@') && !email.startsWith('@')) ({ data, error } = await sb.auth.signInWithPassword({ email, password }));
      else {
        const r = await sb.functions.invoke('login', { body: { handle: email, password } });
        let body = r.data;
        if (r.error) { try { body = await r.error.context.json(); } catch { body = null; } }
        if (!body?.ok) throw new Error(body?.error || 'Wrong @username or password');
        ({ data, error } = await sb.auth.setSession({ access_token: body.access_token, refresh_token: body.refresh_token }));
      }
      if (error) throw error;
      session = data.session; await checkMfa();
      if (mfaPending) throw Object.assign(new Error('Enter your authenticator code'), { code: 'mfa_required' });
      await ensureProfile();
    },
    async signUp(name, email, password, role) {
      const { data, error } = await sb.auth.signUp({ email, password, options: { data: { name, role }, emailRedirectTo: location.origin + location.pathname } });
      if (error) throw error;
      session = data.session;
      if (session) await ensureProfile();
      return !!session; // false = check your email to confirm
    },
    async signOut() { await sb.auth.signOut(); session = null; }
  };
})();
