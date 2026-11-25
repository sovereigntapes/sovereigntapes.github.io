// Account security: two-step sign-in with an authenticator app (Duo Mobile, Google Authenticator, Authy,
// Microsoft Authenticator, 1Password...), one-time backup codes, password reset, sign-in by emailed code,
// lost-phone recovery and admin reset. Every way back in ends with linking an authenticator again (a new QR code).
window.Sec = (() => {
  const sb = () => Backend.sb;
  const say = m => window.dispatchEvent(new CustomEvent('st-toast', { detail: m }));
  const val = id => (document.getElementById(id)?.value || '').trim();
  const mailOnly = v => (/^[^@\s]+@[^@\s]+$/.test(v) ? v : ''); // a typed @username isn't an email
  const code = id => val(id).replace(/\D/g, '');
  const isBackup = v => v.toUpperCase().replace(/[^A-Z0-9]/g, '').length === 10;
  const busy = (b, on, txt) => { if (!b) return; b.disabled = on; if (txt) b.textContent = txt; };
  const codeInput = (id, label = '6-digit code', ph = '••••••') => `<label for="${id}">${label}</label><input id="${id}" class="otp" autocomplete="one-time-code" maxlength="14" placeholder="${ph}" autocapitalize="characters" spellcheck="false">`;
  const qrSrc = q => { const i = q.indexOf('<svg'); return i < 0 ? q : 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(q.slice(i)); };
  const strong = pw => pw.length >= 10 && /[a-z]/i.test(pw) && /\d/.test(pw);
  const WEAK = 'Use at least 10 characters with letters and numbers';
  async function totp() { const { data } = await sb().auth.mfa.listFactors(); return data?.totp || []; }
  async function fn(body) {
    const { data, error } = await sb().functions.invoke('mfa-reset', { body });
    const msg = error ? (await error.context?.json?.().catch(() => null))?.error : data?.error;
    if (error || !data?.ok) throw new Error(msg || 'Something went wrong. Try again.');
    return data;
  }

  // ---- after any recovery: old authenticator is gone, link one again right away (new QR code) ----
  async function afterReset() {
    await sb().auth.refreshSession();
    modal(`<div class="kick">You're back in</div><h2 style="margin:4px 0 6px">Link your authenticator again</h2>
      <p class="sub">Your old authenticator was removed. Scan a new QR code now so your account stays protected.</p>
      <button class="btn wide" id="sec_on">${ic('shield')} Show my new QR code</button>
      <p class="sub" style="text-align:center;margin-top:10px"><a href="#" id="rs_later" class="lnk">Later</a></p>`);
  }

  // ---- shown after a correct password (or emailed code) when two-step sign-in is on ----
  async function challenge() {
    modal(`<div class="kick">Two-step sign-in</div><h2 style="margin:4px 0 6px">Enter your code</h2>
      <p class="sub">Open your authenticator app and enter the 6-digit code for SovereignTapes, or type one of your backup codes.</p>
      ${codeInput('mf_c', '6-digit code or backup code')}<button class="btn wide" id="mf_go">Verify</button>
      <div class="ways"><b>Can't get a code?</b>
        <a href="#" id="mf_lost" class="lnk">${ic('mail')} Lost your phone? Use an email code and your password</a>
        <a href="#" id="mf_help" class="lnk">${ic('shield')} Lost your phone and backup codes</a>
        <a href="#" id="mf_out" class="lnk">Sign out</a></div>`);
    setTimeout(() => document.getElementById('mf_c')?.focus(), 50);
  }
  async function verifyChallenge(b) {
    const raw = val('mf_c');
    busy(b, true, 'Checking…');
    if (isBackup(raw)) {
      try { await fn({ action: 'use_code', code: raw }); } catch (e) { busy(b, false, 'Verify'); return say(e.message); }
      return afterReset();
    }
    const f = (await totp()).find(x => x.status === 'verified');
    if (!f) return location.reload();
    const { error } = await sb().auth.mfa.challengeAndVerify({ factorId: f.id, code: code('mf_c') });
    if (error) { busy(b, false, 'Verify'); return say('That code didn\'t work. Codes change every 30 seconds.'); }
    location.hash = ''; location.reload();
  }
  function help() {
    modal(`<div class="kick">Locked out</div><h2 style="margin:4px 0 6px">Lost your phone and backup codes?</h2>
      <p class="sub">For your safety we can't remove two-step sign-in by email alone. Contact SovereignTapes support from the email on your account and an admin will check it's you and reset it. Then you'll scan a new QR code.</p>
      <p class="sub">Still have your password? Use <a href="#" id="mf_lost" class="lnk">email code + password</a> instead. That works right now.</p>`);
  }

  // ---- emails carry a 6-digit code and a link. The code works everywhere (website, PC app, iPhone, Android);
  //      the link only finishes on the website, so every screen asks for the code. ----
  const back = () => location.origin + location.pathname;
  const mailErr = m => /signups not allowed|not found/i.test(m) ? 'No account uses that email.' : /rate|security purposes/i.test(m) ? 'Too many emails just now. Wait a minute and try again.' : m;
  async function sendCode(email) {
    const { error } = await sb().auth.signInWithOtp({ email, options: { shouldCreateUser: false, emailRedirectTo: back() } });
    if (error) throw new Error(mailErr(error.message));
  }
  async function verifyEmailCode(email, token, type = 'email') {
    if (token.length < 6) throw new Error('Enter the code from the email');
    const { error } = await sb().auth.verifyOtp({ email, token, type });
    if (error) throw new Error('That email code didn\'t work or has expired. Ask for a new one.');
  }
  async function freshEmail() { // signed in from an emailed code or link in the last 15 minutes?
    const t = (await sb().auth.getSession()).data.session?.access_token; if (!t) return false;
    try { const c = JSON.parse(atob(t.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))); return (c.amr || []).some(a => /otp|magiclink/.test(a.method) && Date.now() / 1000 - a.timestamp < 900); } catch { return false; }
  }

  // ---- lost phone: emailed code + (password or backup code) removes the old authenticator ----
  async function lost() {
    const email = Backend.email();
    if (await freshEmail()) {
      modal(`<div class="kick">Lost your phone</div><h2 style="margin:4px 0 6px">Almost back in</h2>
        <p class="sub">Your email is confirmed. Now enter your password <i>or</i> a backup code. Then you'll scan a new QR code.</p>
        <label for="lp_pw">Your password</label><input type="password" id="lp_pw" autocomplete="current-password">
        <p class="sub" style="text-align:center;margin:8px 0">or</p>${codeInput('lp_bk', 'A backup code', 'XXXXX-XXXXX')}
        <button class="btn wide" id="lp_go">Get back in</button>`);
      return;
    }
    modal(`<div class="kick">Lost your phone</div><h2 style="margin:4px 0 6px">Get back in</h2>
      <p class="sub">We'll email a code to <b>${esc(email)}</b>. Enter it here, then your password or a backup code. Then you'll scan a new QR code.</p>
      <p class="sub">Have a backup code? You can skip the email: type it in the code box on the previous screen.</p>
      <button class="btn wide" id="lp_send">${ic('mail')} Email me a code</button>
      <div id="lp_more" hidden>${codeInput('lp_c', 'Code from the email')}<button class="btn wide" id="lp_ok">Continue</button></div>`);
  }
  async function lostSend(b) {
    busy(b, true, 'Sending…');
    try { await sendCode(Backend.email()); } catch (e) { busy(b, false, 'Email me a code'); return say(e.message); }
    b.hidden = true; document.getElementById('lp_more').hidden = false; document.getElementById('lp_c').focus(); say('Code sent. Check your email (and spam).');
  }
  async function lostOk(b) {
    busy(b, true, 'Checking…');
    try { await verifyEmailCode(Backend.email(), code('lp_c')); } catch (e) { busy(b, false, 'Continue'); return say(e.message); }
    lost(); // now confirmed by email: ask for the password or a backup code
  }
  async function lostGo(b) {
    const pw = document.getElementById('lp_pw').value, bk = val('lp_bk');
    if (!pw && !isBackup(bk)) return say('Enter your password or a backup code');
    busy(b, true, 'Checking…');
    try { await fn(isBackup(bk) ? { action: 'use_code', code: bk } : { password: pw }); }
    catch (e) { busy(b, false, 'Get back in'); return say(e.message); }
    afterReset();
  }

  // ---- sign in without a password: emailed code ----
  function emailIn() {
    modal(`<div class="kick">Sign in</div><h2 style="margin:4px 0 6px">Sign in with an email code</h2>
      <p class="sub">No password needed. We'll email you a one-time code. If two-step sign-in is on, you'll enter your authenticator code (or a backup code) next.</p>
      <label for="eo_e">Email</label><input id="eo_e" inputmode="email" autocomplete="email" value="${esc(mailOnly(val('a_email')))}">
      <button class="btn wide" id="eo_send">${ic('mail')} Email me a code</button>
      <div id="eo_more" hidden>${codeInput('eo_c', 'Code from the email')}<button class="btn wide" id="eo_go">Sign in</button></div>`);
  }
  async function emailSend(b) {
    const email = val('eo_e'); if (!email) return say('Enter your email');
    busy(b, true, 'Sending…');
    try { await sendCode(email); } catch (e) { busy(b, false, 'Email me a code'); return say(e.message); }
    b.hidden = true; document.getElementById('eo_more').hidden = false; document.getElementById('eo_c').focus(); say('Code sent. Check your email (and spam).');
  }
  async function emailGo(b) {
    busy(b, true, 'Signing in…');
    try { await verifyEmailCode(val('eo_e'), code('eo_c')); } catch (e) { busy(b, false, 'Sign in'); return say(e.message); }
    location.hash = ''; location.reload(); // two-step sign-in, if on, is asked for on load
  }

  // ---- forgot password: emailed code (or link), then a new password; two-step sign-in first if it's on ----
  function forgot() {
    fpVerified = false;
    modal(`<div class="kick">Locked out?</div><h2 style="margin:4px 0 6px">Reset your password</h2>
      <p class="sub">Enter your account email. We'll email you a code to set a new password.</p>
      <label for="fp_e">Email</label><input id="fp_e" inputmode="email" autocomplete="email" value="${esc(mailOnly(val('a_email')))}">
      <button class="btn wide" id="fp_send">${ic('mail')} Email me a code</button>
      <div id="fp_more" hidden>${codeInput('fp_c', 'Code from the email')}<label for="fp_pw">New password</label><input type="password" id="fp_pw" minlength="10" autocomplete="new-password">
      <p class="sub" style="font-size:13px">${WEAK}.</p>
      <div id="fp_mfa" hidden>${codeInput('fp_t', 'Authenticator code or a backup code')}</div>
      <button class="btn wide" id="fp_go">Set new password</button></div>`);
  }
  async function forgotSend(b) {
    const email = val('fp_e'); if (!email) return say('Enter your email');
    busy(b, true, 'Sending…');
    const { error } = await sb().auth.resetPasswordForEmail(email, { redirectTo: back() });
    if (error) { busy(b, false, 'Email me a code'); return say(mailErr(error.message)); }
    b.hidden = true; document.getElementById('fp_more').hidden = false; document.getElementById('fp_c').focus(); say('Code sent. Check your email (and spam).');
  }
  let fpVerified = false;
  async function forgotGo(b) {
    const email = val('fp_e'), pw = document.getElementById('fp_pw').value;
    if (!strong(pw)) return say(WEAK);
    busy(b, true, 'Saving…');
    if (!fpVerified) {
      try { await verifyEmailCode(email, code('fp_c'), 'recovery'); } catch (e) { busy(b, false, 'Set new password'); return say(e.message); }
      fpVerified = true;
    }
    let reset = false;
    const aal = (await sb().auth.mfa.getAuthenticatorAssuranceLevel()).data;
    if (aal?.nextLevel === 'aal2' && aal.currentLevel !== 'aal2') {
      const box = document.getElementById('fp_mfa'), raw = val('fp_t');
      if (box.hidden) { box.hidden = false; busy(b, false, 'Set new password'); return say('Two-step sign-in is on. Enter your authenticator code or a backup code too.'); }
      if (isBackup(raw)) {
        try { await fn({ action: 'use_code', code: raw }); reset = true; } catch (e) { busy(b, false, 'Set new password'); return say(e.message); }
        await sb().auth.refreshSession();
      } else {
        const f = (await totp()).find(x => x.status === 'verified');
        if (!f) { busy(b, false, 'Set new password'); return say('Use a backup code instead.'); }
        const { error } = await sb().auth.mfa.challengeAndVerify({ factorId: f.id, code: code('fp_t') });
        if (error) { busy(b, false, 'Set new password'); return say('That authenticator code didn\'t work.'); }
      }
    }
    const { error } = await sb().auth.updateUser({ password: pw });
    if (error) { busy(b, false, 'Set new password'); return say(error.message); }
    if (reset) return afterReset();
    say('Password updated. You\'re signed in.'); setTimeout(() => { location.hash = ''; location.reload(); }, 900);
  }
  const pwModal = () => modal(`<div class="kick">Reset password</div><h2 style="margin:4px 0 6px">Choose a new password</h2><p class="sub">You're signed in from the reset link. Set a new password to finish.</p>
      <label for="cp_pw">New password</label><input type="password" id="cp_pw" minlength="10" autocomplete="new-password"><p class="sub" style="font-size:13px">${WEAK}.</p><button class="btn wide" id="cp_go">Save</button>`);

  // ---- Account page panel ----
  async function fill(box) {
    box.dataset.done = '1';
    const on = (await totp()).find(x => x.status === 'verified');
    let left = null; if (on) { try { left = (await fn({ action: 'codes_left' })).left; } catch { /* shown as unknown */ } }
    box.innerHTML = `<div class="sechead">${ic('shield')}<div><b>Two-step sign-in</b><div class="sub">${on ? 'On · codes from your authenticator app' : 'Off · strongly recommended for artists, DJs and admins'}</div></div><span class="pill ${on ? 'ok' : ''}">${on ? 'On' : 'Off'}</span></div>
      ${on ? `<p class="sub" style="margin:10px 0 0">Backup codes: <b>${left ?? '?'}</b> left${left === 0 ? ' · make new ones now' : ''}</p>` : ''}
      <div class="row" style="margin-top:12px">${on ? `<button class="btn ghost" id="sec_codes">${ic('shield')} New backup codes</button><button class="btn ghost" id="sec_off">Turn off</button>` : `<button class="btn" id="sec_on">${ic('shield')} Turn on</button>`}<button class="btn ghost" id="sec_pw">Change password</button></div>
      <details class="sub ways-list"><summary>Ways to get back in if you're ever locked out</summary><ul>
        <li>Forgot password: "Forgot password?" emails you a reset link.</li><li>No password handy: "Sign in with an email code".</li>
        <li>Lost phone: a backup code, or an email code plus your password. You'll scan a new QR code.</li><li>Lost phone and backup codes: contact support; an admin checks it's you and resets it.</li></ul></details>`;
  }
  async function enroll(b) {
    const label = b?.textContent;
    busy(b, true, 'Starting…');
    for (const f of (await totp()).filter(x => x.status !== 'verified')) await sb().auth.mfa.unenroll({ factorId: f.id });
    const { data, error } = await sb().auth.mfa.enroll({ factorType: 'totp', friendlyName: 'SovereignTapes ' + Date.now().toString(36), issuer: 'SovereignTapes' });
    busy(b, false, label);
    if (error) return say(error.message);
    modal(`<div class="kick">Two-step sign-in</div><h2 style="margin:4px 0 6px">Scan your QR code</h2>
      <ol class="steps"><li>Open <b>Duo Mobile</b> (or Google Authenticator, Authy, Microsoft Authenticator).</li><li>Tap <b>Add</b> › <b>Use QR code</b> and scan this.</li><li>Enter the 6-digit code it shows.</li></ol>
      <div class="qr"><img src="${qrSrc(data.totp.qr_code)}" alt="QR code to link your authenticator app"></div>
      <details class="sub"><summary>Can't scan? Enter this key instead</summary><code class="key">${esc(data.totp.secret)}</code></details>
      ${codeInput('en_c')}<button class="btn wide" id="en_go" data-f="${data.id}">Turn on</button>`);
  }
  async function enrollGo(b) {
    busy(b, true, 'Checking…');
    const { error } = await sb().auth.mfa.challengeAndVerify({ factorId: b.dataset.f, code: code('en_c') });
    if (error) { busy(b, false, 'Turn on'); return say('That code didn\'t work. Try the newest one.'); }
    say('Two-step sign-in is on'); await newCodes();
  }
  let lastCodes = [];
  async function newCodes(b) {
    busy(b, true, 'Making codes…');
    try { lastCodes = (await fn({ action: 'codes_new' })).codes; } catch (e) { busy(b, false, 'New backup codes'); return say(e.message); }
    modal(`<div class="kick">Backup codes</div><h2 style="margin:4px 0 6px">Save these 10 codes</h2>
      <p class="sub">If you lose your phone, each code gets you back in once. Keep them somewhere safe (a photo, a password manager, or printed). You won't see them again, and any older codes stop working.</p>
      <div class="codes">${lastCodes.map(c => `<code>${c}</code>`).join('')}</div>
      <div class="row" style="margin-top:12px"><button class="btn" id="bk_copy">Copy all</button><button class="btn ghost" id="bk_dl">Download</button></div>
      <button class="btn wide ghost" id="bk_done" style="margin-top:10px">I saved them</button>`);
    refreshBox();
  }
  async function off(b) {
    if (b.dataset.armed !== '1') { b.dataset.armed = '1'; b.textContent = 'Tap again to turn off'; return; }
    busy(b, true, 'Turning off…');
    for (const f of await totp()) { const { error } = await sb().auth.mfa.unenroll({ factorId: f.id }); if (error) { busy(b, false, 'Turn off'); return say(error.message); } }
    await sb().auth.refreshSession(); say('Two-step sign-in is off'); refreshBox();
  }
  function changePw() {
    modal(`<div class="kick">Security</div><h2 style="margin:4px 0 6px">Change password</h2>
      <label for="cp_pw">New password</label><input type="password" id="cp_pw" minlength="10" autocomplete="new-password"><p class="sub" style="font-size:13px">${WEAK}.</p><button class="btn wide" id="cp_go">Save</button>`);
  }
  async function changePwGo(b) {
    const pw = document.getElementById('cp_pw').value; if (!strong(pw)) return say(WEAK);
    busy(b, true, 'Saving…');
    const { error } = await sb().auth.updateUser({ password: pw });
    if (error) { busy(b, false, 'Save'); return say(error.message); }
    closeModal(); say('Password changed');
  }
  function refreshBox() { const box = document.getElementById('secbox'); if (box) { delete box.dataset.done; fill(box); } }

  // ---- admin: reset someone's two-step sign-in after checking it's really them ----
  function fillAdmin(box) {
    box.dataset.done = '1';
    box.innerHTML = `<div class="kick">${ic('shield')} Account recovery</div><p class="sub">Someone lost their phone and backup codes? Check it's really them (they email you from their account email), then remove their two-step sign-in. They'll scan a new QR code when they sign in.</p>
      <div class="row" style="gap:8px"><input id="ar_e" inputmode="email" placeholder="their account email" style="flex:1;min-width:180px"><button class="btn ghost" id="ar_go">Reset two-step sign-in</button></div>`;
  }
  async function adminReset(b) {
    const email = val('ar_e'); if (!email) return say('Enter their email');
    if (b.dataset.armed !== email) { b.dataset.armed = email; b.textContent = 'Tap again to confirm'; return; }
    busy(b, true, 'Resetting…');
    try { await fn({ action: 'admin_reset', email }); say('Done. Their two-step sign-in is off until they link a new phone.'); document.getElementById('ar_e').value = ''; }
    catch (e) { say(e.message); }
    delete b.dataset.armed; busy(b, false, 'Reset two-step sign-in');
  }

  new MutationObserver(() => {
    const box = document.getElementById('secbox'); if (box && !box.dataset.done && Backend.sb) fill(box);
    const adm = document.getElementById('secadm'); if (adm && !adm.dataset.done && Backend.sb) fillAdmin(adm);
  }).observe(document.documentElement, { childList: true, subtree: true });

  const H = { mf_go: verifyChallenge, mf_lost: lost, mf_help: help, mf_out: async () => { await Backend.signOut(); location.reload(); }, lp_send: lostSend, lp_ok: lostOk, lp_go: lostGo,
    a_forgot: forgot, a_otp: emailIn, eo_send: emailSend, eo_go: emailGo, fp_send: forgotSend, fp_go: forgotGo, sec_on: enroll, en_go: enrollGo, sec_off: off,
    sec_codes: newCodes, sec_pw: changePw, cp_go: changePwGo, ar_go: adminReset, rs_later: () => { closeModal(); location.hash = 'account'; location.reload(); },
    bk_copy: () => navigator.clipboard?.writeText(lastCodes.join('\n')).then(() => say('Copied. Paste them somewhere safe.'), () => say('Copy failed. Write them down instead.')),
    bk_dl: () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob(['SovereignTapes backup codes (each works once)\n\n' + lastCodes.join('\n') + '\n'], { type: 'text/plain' })); a.download = 'sovereigntapes-backup-codes.txt'; a.click(); },
    bk_done: () => { closeModal(); lastCodes = []; refreshBox(); if (sessionStorage.getItem('st_pw')) { sessionStorage.removeItem('st_pw'); pwModal(); } } };
  document.addEventListener('click', e => { const el = e.target.closest('[id]'); const h = el && H[el.id]; if (h) { e.preventDefault(); e.stopPropagation(); h(el); } }, true);
  document.addEventListener('keydown', e => { if (e.key !== 'Enter') return; const go = { mf_c: 'mf_go', en_c: 'en_go', cp_pw: 'cp_go', fp_e: 'fp_send', fp_pw: 'fp_go', fp_t: 'fp_go', lp_c: 'lp_ok', lp_pw: 'lp_go', lp_bk: 'lp_go', eo_e: 'eo_send', eo_c: 'eo_go', ar_e: 'ar_go' }[e.target.id]; if (go) { e.preventDefault(); document.getElementById(go)?.click(); } });
  // A reset link with two-step sign-in on: the code comes first, then the new-password box (remembered across the reload).
  Backend.ready?.then(() => {
    const pwReset = Backend.recovery?.();
    if (Backend.mfaPending()) { if (pwReset) sessionStorage.setItem('st_pw', '1'); return challenge(); }
    if (pwReset || sessionStorage.getItem('st_pw')) {
      sessionStorage.removeItem('st_pw');
      // wait until the sign-in link is cleared from the address bar (that change closes any open modal)
      const open = () => /access_token/.test(location.hash) ? setTimeout(open, 100) : setTimeout(pwModal, 300); open();
    }
  });
  return { challenge };
})();
