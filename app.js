// ---------- icons ----------
const P={home:'M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',search:'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4',plus:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8v8M8 12h8',
 lib:'M4 4h4v16H4zM10 4h4v16h-4zM16.5 5.2l3.4-.9 3.6 14.6-3.4.9z',chart:'M5 20V11M12 20V4M19 20v-6',clock:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2',bell:'M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4',
 up2:'M12 16V4M7 9l5-5 5 5M4 20h16',heart:'M12 20.5s-8-5-8-10.7A4.4 4.4 0 0 1 12 7a4.4 4.4 0 0 1 8 2.8c0 5.7-8 10.7-8 10.7z',prev:'M6 5v14M19 5 9 12l10 7z',next:'M18 5v14M5 5l10 7-10 7z',
 shuf:'M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5',rep:'M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3',down:'M6 9l6 6 6-6',up:'M6 15l6-6 6 6',right:'M9 6l6 6-6 6',
 dl:'M12 4v12M7 11l5 5 5-5M4 20h16',link:'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1',user:'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
 trash:'M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13',x:'M6 6l12 12M18 6 6 18',arrow:'M5 12h14M13 6l6 6-6 6',dots:'M12 5h.01M12 12h.01M12 19h.01',vol:'M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7',
 news:'M4 5h13v14H6a2 2 0 0 1-2-2zM17 9h3v8a2 2 0 0 1-2 2M7 9h7M7 13h7M7 16h4',crown:'M4 18h16M5 15 3.5 7l5 4L12 5l3.5 6 5-4L19 15z',disc:'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z',star:'M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',bolt:'M13 2 4 14h7l-1 8 9-12h-7z',
 ring:'M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12',shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',mail:'M3 6h18v12H3zM3 7l9 6 9-6',
 phone:'M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2',check:'M5 12l5 5 9-10'};
const F={play:'M8 5.5v13l11-6.5z',pause:'M7 5h3.5v14H7zM13.5 5H17v14h-3.5z',heartf:P.heart,starf:P.star};
const ic=(n,cls='')=>F[n]?`<svg class="i f ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${F[n]}"/></svg>`:`<svg class="i ${cls}" viewBox="0 0 24 24" aria-hidden="true"${n==='dots'?' style="stroke-width:3.2"':''}><path d="${P[n]}"/></svg>`;
const paintIcons=(root=document)=>root.querySelectorAll('[data-ic]').forEach(e=>{e.outerHTML=ic(e.dataset.ic)});paintIcons();

// ---------- helpers ----------
const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s),esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=s=>{s=Math.max(0,Math.floor(s||0));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
const num=n=>n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':String(n);
const ago=ts=>{const s=(Date.now()-ts)/1e3;return s<60?'just now':s<3600?Math.floor(s/60)+'m ago':s<86400?Math.floor(s/3600)+'h ago':Math.floor(s/86400)+'d ago'};
const until=ts=>{let s=Math.max(0,(ts-Date.now())/1e3);const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600);s%=3600;const m=Math.floor(s/60);return(d?d+'d ':'')+h+'h '+m+'m '+Math.floor(s%60)+'s'};
const hkey=s=>{let h=5381;for(const c of String(s).toLowerCase())h=(h*33^c.charCodeAt(0))>>>0;return h.toString(36)};
const toast=m=>{const e=$('#toast');e.textContent=m;e.classList.add('show');clearTimeout(e._t);e._t=setTimeout(()=>e.classList.remove('show'),2600)};
const LS={get(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}};
let blocked=new Set(LS.get('st_blocked',[]));const isBlocked=id=>!!id&&blocked.has(id);
const GENRES=['Hip-Hop','Trap','Drill','R&B','Afrobeats','Reggaeton','Pop','Electronic','Other'];
const GCOL={'Hip-Hop':'#1fa5c4','Trap':'#7a1fe0','Drill':'#3d4a5c','R&B':'#d6247a','Afrobeats':'#e07a12','Reggaeton':'#16a36b','Pop':'#13b8a0','Electronic':'#5b3df0','Other':'#6c6c74'};
const CFG=window.APP_CONFIG||{};
const BADGES=CFG.BADGES||[[200000,'2x Platinum','#e9e7ff'],[100000,'Platinum','#d7dde2'],[25000,'Gold','#f5c542'],[5000,'Silver','#c3c8d0'],[1000,'Bronze','#d08a4e']];
const PACKAGES=CFG.SPONSOR_PACKAGES||[{days:7,price:'$25'},{days:30,price:'$75'}];
const REGION=(()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||''}catch{return''}})();
const place=r=>!r||r==='Unknown'?'Unknown':r.split('/').pop().replace(/_/g,' ')+(r.includes('/')?' · '+r.split('/')[0]:'');
const use=n=>Backend.use(n);

// ---------- state ----------
let db=null,assets=null,user=null,dls=null,me=null,myName='',myRole='guest',status='loading',canEditAll=false;
const S={reports:[],editorials:[],tapes:[],stats:[],likes:[],comments:[],follows:[],ratings:[],sponsors:[],sponsor_requests:[],entitlements:[],premieres:[],profiles:[],payees:[],pros:[],boosts:[],memberships:[],verified:[],unlocks:[],earnings:[],bookings:[],shows:[],gigs:[]};
if(location.port==='5173')window.__st={S,me:()=>me,redraw:()=>{counts();route()}}; // local test hook (npx serve www -l 5173) for selftest.js
const plusUntil=id=>{const e=S.entitlements.find(x=>x.id===id);return e&&+e.plus_until>Date.now()?+e.plus_until:0};
const isPlus=()=>!!(me&&plusUntil(me)),canBuy=()=>!Backend.isNative()||CFG.SHOW_PURCHASES_IN_APPS===true;
const prof=id=>S.profiles.find(p=>p.id===id)||{},payReady=id=>!!S.payees.find(p=>p.id===id)?.ready;
const proUntil=id=>{const p=S.pros.find(x=>x.id===id);return p&&+p.until>Date.now()?+p.until:0};
const verUntil=id=>{const v=S.verified.find(x=>x.id===id);return v&&+v.until>Date.now()?+v.until:0},isVerified=id=>!!(proUntil(id)||verUntil(id));
const proChip=id=>isVerified(id)?`<span class="plus" title="Verified">${ic('check')}Verified</span>`:'';
const memberOf=a=>!!(me&&S.memberships.some(m=>m.fan===me&&m.artist===a&&+m.until>Date.now()));
const owns=t=>!!(me&&(t.by===me||S.unlocks.some(u=>u.id===me+'_'+t.id)));
const myCopy=t=>me&&S.unlocks.find(u=>u.id===me+'_'+t.id)?.no,soldOut=t=>+t.edition>0&&(+t.sold||0)>=+t.edition;
const edChip=t=>+t.edition>0?`<span class="plus ed">${ic('star')}${soldOut(t)?'Sold out':`Limited · ${+t.edition-(+t.sold||0)} of ${+t.edition} left`}</span>`:'';
const boosted=(t,k)=>S.boosts.some(b=>b.tape===t.id&&b.kind===k&&+b.until>Date.now());
const money=c=>'$'+(c/100).toFixed(c%100?2:0),toCents=v=>Math.round(parseFloat(String(v).replace(/[^0-9.]/g,''))*100)||0;
const BOOSTS=CFG.BOOSTS||{home:['Home spotlight','$15','Top of Home for 24 hours'],upcoming:['Top of Upcoming','$10','First in Upcoming and the Home countdown for 7 days'],charts:['Charts spotlight','$20','Featured above every chart for 7 days']};
async function buy(kind,body={}){if(!needMe())return;if(!canBuy())return toast('Purchases are on the SovereignTapes website'+(CFG.SHARE_URL?': '+CFG.SHARE_URL.replace(/^https?:\/\//,''):''));
 try{toast('Opening secure checkout…');const r=await Backend.pay('checkout',{kind,...body});location.href=r.url}catch(e){toast(e.message)}}
const supportBtns=a=>!a||a===me?'':`${payReady(a)?`<button class="btn ghost" data-tip="${a}">${ic('heart')} Support</button>`:''}${payReady(a)&&prof(a).member_price?(memberOf(a)?`<span class="btn ghost on">${ic('check')} Member</span>`:`<button class="btn ghost" data-join="${a}">${ic('crown')} Join · ${money(prof(a).member_price)}/mo</button>`):''}`;
const plusChip=id=>plusUntil(id)?`<span class="plus">${ic('crown')}Plus</span>`:'';
let reminders=LS.get('st_rem',[]),homeG='',query='',sortBy='new',chartTab='hot';
const live=t=>t.release<=Date.now();
let C={};function counts(){C={};const g=id=>C[id]||(C[id]={plays:0,downloads:0,likes:0,comments:0,rsum:0,rn:0});
 for(const s of S.stats){const x=g(s.id);x.plays=+s.plays||0;x.downloads=+s.downloads||0}
 for(const l of S.likes)g(l.tape).likes++;for(const c of S.comments)g(c.tape).comments++;for(const r of S.ratings){const x=g(r.tape);x.rsum+=+r.stars||0;x.rn++}}
const st=t=>C[t.id]||{plays:0,downloads:0,likes:0,comments:0,rsum:0,rn:0};
const total=t=>st(t).plays+st(t).downloads,rating=t=>st(t).rn?st(t).rsum/st(t).rn:0;
const badge=t=>BADGES.find(b=>total(t)>=b[0]);
const sponsoredUntil=t=>{const s=S.sponsors.find(x=>x.id===t.id);return s&&+s.until>Date.now()?+s.until:0};
const score=t=>{const s=st(t);return(s.plays+s.likes*3+s.comments*4+s.downloads*2+rating(t)*s.rn+1)/Math.pow((Date.now()-t.release)/36e5+2,.8)};
const liked=t=>!!(me&&t&&S.likes.some(l=>l.id===me+'_'+t.id)),following=a=>!!(me&&S.follows.some(f=>f.id===me+'_'+hkey(a)));
const myStars=t=>(S.ratings.find(r=>r.id===me+'_'+t.id)||{}).stars||0;
const followers=a=>S.follows.filter(f=>f.akey===hkey(a)).length,mine=t=>me&&(t.by===me||canEditAll);
const isArtist=()=>myRole==='artist'||myRole==='admin';
const released=()=>S.tapes.filter(t=>live(t)&&!isBlocked(t.by)),upcoming=()=>S.tapes.filter(t=>!live(t)).sort((a,b)=>boosted(b,'upcoming')-boosted(a,'upcoming')||a.release-b.release),trending=()=>released().sort((a,b)=>score(b)-score(a));
const isPremiere=t=>S.premieres.some(p=>p.id===t.id),justDropped=t=>live(t)&&Date.now()-t.release<864e5;
const tagFor=t=>justDropped(t)?'<span class="tag lime">Just dropped</span>':sponsoredUntil(t)?'<span class="tag lime">Sponsored</span>':isPremiere(t)?'<span class="tag wp">World Premiere</span>':'';
const djList=()=>{const m=new Map();for(const t of released())if(t.host){const k=hkey(t.host),x=m.get(k)||{name:t.host,key:k,tapes:[],plays:0};x.tapes.push(t);x.plays+=total(t);m.set(k,x)}return[...m.values()].sort((a,b)=>b.plays-a.plays||b.tapes.length-a.tapes.length)};
const personHref=n=>`#${S.tapes.some(t=>hkey(t.artist)===hkey(n))?'artist':'dj'}-${hkey(n)}`;
const cdParts=ts=>{let s=Math.max(0,Math.floor((ts-Date.now())/1e3));const d=Math.floor(s/86400);s%=86400;const h=Math.floor(s/3600);s%=3600;const m=Math.floor(s/60);
 return[[d,'days'],[h,'hrs'],[m,'min'],[s%60,'sec']].map(([v,l])=>`<div><b>${String(v).padStart(2,'0')}</b><span>${l}</span></div>`).join('')};
const cdBox=ts=>`<div class="cdx" data-cd="${ts}" role="timer" aria-label="Countdown to ${new Date(ts).toLocaleString()}">${cdParts(ts)}</div>`;
function tickCd(){for(const e of $$('[data-cd]')){if(+e.dataset.cd<=Date.now()){toast('It just dropped!');return route()}e.innerHTML=cdParts(+e.dataset.cd)}}
const nextDrop=()=>upcoming().find(t=>boosted(t,'upcoming'))||upcoming().find(t=>isPremiere(t)||sponsoredUntil(t))||upcoming()[0];
const countHero=()=>{const t=nextDrop();if(!t)return'';return`<section class="cdhero" data-go="#tape-${t.id}"><div class="cv"><img decoding="async" loading="lazy" src="${coverURL(t)}" alt=""></div><div><div class="kick">${isPremiere(t)?'World Premiere':'Next drop'} · live countdown</div><h1>${esc(t.title)}</h1><p class="sub">${esc(t.artist)}${t.host?' · Hosted by '+esc(t.host):''} · ${new Date(t.release).toLocaleString(undefined,{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})}</p>${cdBox(t.release)}
 <button class="btn ${reminders.includes(t.id)?'on':''}" data-rem="${t.id}" style="margin-top:14px">${ic('bell')} ${reminders.includes(t.id)?'Reminder set':'Remind me'}</button></div></section>`};
const djCard=d=>`<a class="dj" href="#dj-${d.key}"><img decoding="async" loading="lazy" src="${coverURL(d.tapes[0])}" alt=""><b>${esc(d.name)}</b><span>${d.tapes.length} tape${d.tapes.length===1?'':'s'} · ${num(d.plays)} plays</span></a>`;
const djRow=()=>{const l=djList();return l.length?`<h2>DJs &amp; hosts ${see('djs')}</h2><div class="djs">${l.slice(0,12).map(djCard).join('')}</div>`:''};
const splitTabs=()=>`<div class="coll split" style="margin-top:22px"><div class="bn w" data-go="#premieres"><h3>World Premieres</h3><p>${released().filter(isPremiere).length} official releases from established artists and labels</p><span class="go">${ic('arrow')}</span></div><div class="bn l" data-go="#indy"><h3>Indy</h3><p>${released().filter(t=>!isPremiere(t)).length} independent and underground tapes</p><span class="go">${ic('arrow')}</span></div></div>`;
let listSort='hot',chartScope='all';
const sorted=l=>l.sort(listSort==='new'?(a,b)=>b.release-a.release:listSort==='plays'?(a,b)=>total(b)-total(a):(a,b)=>score(b)-score(a));
const sortChips=()=>`<div class="chips" style="margin:14px 0 18px">${[['hot','Hot'],['new','Newest'],['plays','Most played']].map(([k,n])=>`<button class="chip ${listSort===k?'on':''}" data-ls="${k}">${n}</button>`).join('')}</div>`;
const featured=()=>released().filter(sponsoredUntil).sort((a,b)=>score(b)-score(a));

// ---------- offline library (IndexedDB) ----------
const OFF={_d:null,open(){return this._d||(this._d=new Promise((ok,no)=>{const r=indexedDB.open('st-offline',1);r.onupgradeneeded=()=>{r.result.createObjectStore('audio');r.result.createObjectStore('tapes')};r.onsuccess=()=>ok(r.result);r.onerror=()=>no(r.error)}))},
 async run(s,m,fn){const d=await this.open();return new Promise((ok,no)=>{const tx=d.transaction(s,m),r=fn(tx.objectStore(s));tx.oncomplete=()=>ok(r&&r.result);tx.onerror=()=>no(tx.error)})},
 get(s,k){return this.run(s,'readonly',x=>x.get(k))},put(s,k,v){return this.run(s,'readwrite',x=>x.put(v,k))},del(s,k){return this.run(s,'readwrite',x=>x.delete(k))},all(s){return this.run(s,'readonly',x=>x.getAll())}};
const offline=new Map(),offCovers=new Map();
async function loadOffline(){try{for(const t of await OFF.all('tapes')){const {coverBlob,...rest}=t;offline.set(t.id,rest);if(coverBlob)offCovers.set(t.id,URL.createObjectURL(coverBlob))}}catch{}}
async function saveOffline(t,btn){if(!(await gate(t)))return;const n=t.tracks.length;try{
  for(const [i,tr] of t.tracks.entries()){if(btn)btn.textContent=`Saving ${i+1} of ${n}…`;if(await OFF.get('audio',tr.asset))continue;
   const r=await fetch(tr.asset.startsWith('vault/')?await Backend.signed(tr.asset):Backend.url(tr.asset));if(!r.ok)throw new Error('Track '+(i+1)+' is unavailable');await OFF.put('audio',tr.asset,await r.blob())}
  let coverBlob=null;if(t.coverId){try{coverBlob=await (await fetch(Backend.url(t.coverId))).blob()}catch{}}
  await OFF.put('tapes',t.id,{...t,coverBlob});offline.set(t.id,t);if(coverBlob)offCovers.set(t.id,URL.createObjectURL(coverBlob));toast('Saved. This tape now plays without internet.')}
 catch(e){toast('Could not save: '+e.message)}route()}
async function removeOffline(t){for(const tr of t.tracks)await OFF.del('audio',tr.asset).catch(()=>{});await OFF.del('tapes',t.id).catch(()=>{});offline.delete(t.id);toast('Removed from this device');route()}

const genCovers=new Map();
// Record ids go straight into links and buttons, so rows with odd ids (anything but letters, digits, _ and -) are dropped on load.
const SAFE_ID=/^[\w-]{1,200}$/; // long enough for Stripe ids + user ids (split earnings)
// Only real upload paths (<user id>/<file>) become image addresses; anything else in someone's record is ignored (blocks code injection).
const okPath=p=>typeof p==='string'&&/^[0-9a-f-]{36}\/[\w\/-]+\.[a-z0-9]{1,5}$/i.test(p);
function coverURL(t){if(offCovers.has(t.id))return offCovers.get(t.id);if(okPath(t.coverId))return Backend.url(t.coverId);if(genCovers.has(t.id))return genCovers.get(t.id);
 const c=document.createElement('canvas');c.width=c.height=500;const x=c.getContext('2d'),[h1,h2]=t.hue||[75,260];
 const g=x.createLinearGradient(0,0,500,500);g.addColorStop(0,`hsl(${h1},75%,42%)`);g.addColorStop(1,`hsl(${h2},70%,8%)`);x.fillStyle=g;x.fillRect(0,0,500,500);
 for(let i=0;i<12;i++){x.strokeStyle=`hsla(${h1+i*9},90%,70%,.18)`;x.lineWidth=2;x.beginPath();x.arc(250,280,26+i*20,0,Math.PI*2);x.stroke()}
 x.fillStyle='#fff';x.textAlign='center';x.font='800 50px "Plus Jakarta Sans", sans-serif';x.fillText(String(t.title).toUpperCase(),250,160,450);x.font='600 24px "Plus Jakarta Sans", sans-serif';x.fillText(t.artist,250,462,450);
 const u=c.toDataURL('image/jpeg',.85);genCovers.set(t.id,u);return u}
const audioURLs=new Map();
async function audioURL(id){if(audioURLs.has(id))return audioURLs.get(id);let b=null;try{b=await OFF.get('audio',id)}catch{}
 if(!b&&!navigator.onLine)throw new Error('You are offline and this tape is not saved');
 if(!b&&id.startsWith('vault/')){let u;try{u=await Backend.signed(id)}catch{throw new Error('Members only. Join to listen.')}audioURLs.set(id,u);setTimeout(()=>audioURLs.delete(id),50*60e3);return u}
 if(b){const u=URL.createObjectURL(b);audioURLs.set(id,u);return u}if(!navigator.onLine)throw new Error('You are offline and this tape is not saved');return Backend.url(id)}

// ---------- downloads (tiers) ----------
// Sponsored tapes: free for everyone. Others: free account, 4 a week (set in the database).
async function gate(t){if(!t.allowDl){toast('The artist turned off downloads for this tape');return false}
 if(offline.has(t.id))return true;if(!navigator.onLine){toast('Connect to the internet to download');return false}
 try{const r=await db.rpc('record_download',{p_tape:t.id,p_region:REGION});
  if(r.ok){if(!r.sponsored&&me)toast(`Download counted. ${r.left} free download${r.left===1?'':'s'} left this week.`);return true}
  if(r.reason==='signin'){toast('Create a free account to download this tape. Sponsored tapes need no account.');location.hash='account';return false}
  if(r.reason==='buy'){toast(`Buy this tape (${money(t.price)}) to download it. Streaming stays free.`);return false}
  if(r.reason==='members'){toast('Downloads are for members of this artist');return false}
  if(r.reason==='limit'){toast(`You've used this week's ${r.limit} free downloads. Go Plus for unlimited.`);location.hash='plus';return false}
  toast('Downloads are off for this tape');return false}catch(e){toast('Download failed: '+e.message);return false}}
const EXT={'audio/mpeg':'mp3','audio/mp4':'m4a','audio/x-m4a':'m4a','audio/wav':'wav','audio/x-wav':'wav','audio/ogg':'ogg','audio/flac':'flac','audio/aac':'aac'};
// Real files: tagged MP3s (title, artist, album, track #, cover) that work in iTunes and any music player.
const safe=s=>String(s).replace(/[\\/:*?"<>|]+/g,'').replace(/\s+/g,' ').trim().slice(0,120)||'Untitled';
const folderFor=t=>'SovereignTapes/'+safe(`${t.artist} - ${t.title}`);
const cat=a=>{const o=new Uint8Array(a.reduce((n,x)=>n+x.length,0));let i=0;for(const x of a){o.set(x,i);i+=x.length}return o};
const u16=s=>{const o=new Uint8Array(2+s.length*2);o[0]=255;o[1]=254;for(let i=0;i<s.length;i++){const c=s.charCodeAt(i);o[2+i*2]=c&255;o[3+i*2]=c>>8}return o};
const latin=s=>Uint8Array.from([...s].map(c=>c.charCodeAt(0)&255));
function id3(tags,cover){const parts=[],frame=(id,b)=>{const h=new Uint8Array(10);h.set(latin(id));h[4]=b.length>>>24;h[5]=b.length>>>16&255;h[6]=b.length>>>8&255;h[7]=b.length&255;parts.push(h,b)};
 for(const [id,v] of Object.entries(tags))if(v)frame(id,cat([Uint8Array.of(1),u16(String(v))]));
 if(cover)frame('APIC',cat([Uint8Array.of(0),latin(cover.type+'\0'),Uint8Array.of(3,0),cover.bytes]));
 const body=cat(parts),n=body.length,h=Uint8Array.of(73,68,51,3,0,0,n>>>21&127,n>>>14&127,n>>>7&127,n&127);return cat([h,body])}
async function coverBytes(t){try{const b=await (await fetch(coverURL(t))).blob();return{type:b.type||'image/jpeg',bytes:new Uint8Array(await b.arrayBuffer())}}catch{return null}}
async function trackFile(t,j,cover){const tr=t.tracks[j],blob=await (await fetch(await audioURL(tr.asset))).blob(),ext=EXT[blob.type]||(tr.asset.split('.').pop()||'mp3').toLowerCase(),name=safe(`${String(j+1).padStart(2,'0')} ${t.artist} - ${tr.title}`)+'.'+ext;
 if(ext!=='mp3')return{name,blob};let b=new Uint8Array(await blob.arrayBuffer());
 if(b[0]===73&&b[1]===68&&b[2]===51){const sz=((b[6]&127)<<21|(b[7]&127)<<14|(b[8]&127)<<7|(b[9]&127))+10+(b[5]&16?10:0);b=b.subarray(sz)}
 const tag=id3({TIT2:tr.title+(tr.feat?` (feat. ${tr.feat})`:''),TPE1:t.artist,TPE2:t.artist,TALB:t.title,TRCK:`${j+1}/${t.tracks.length}`,TCON:t.genre,TYER:String(new Date(t.release).getFullYear()),TPUB:'SovereignTapes',COMM:null},cover);
 return{name,blob:new Blob([tag,b],{type:'audio/mpeg'})}}
const tracklist=t=>`${t.title}\n${t.artist}${t.host?'\nHosted by '+t.host:''}\n${t.genre} · ${new Date(t.release).toLocaleDateString()}\n\n`+t.tracks.map((x,j)=>`${j+1}. ${x.title}${x.feat?' (feat. '+x.feat+')':''}  ${fmt(x.dur)}`).join('\n')+'\n\nDownloaded from SovereignTapes\n';
const saveErr=err=>{if(!/declin|cancel/.test(err?.code||''))toast('Download did not finish: '+(err?.message||'error'))};
async function download(t,j){if(!(await gate(t)))return;try{const f=await trackFile(t,j,await coverBytes(t));const r=await dls.save({filename:f.name,data:f.blob,folder:folderFor(t)});toast('Saved to '+r.where)}catch(err){saveErr(err)}}
async function downloadZip(t,btn){if(!(await gate(t)))return;const old=btn.innerHTML;btn.disabled=true;try{const z=new JSZip(),cover=await coverBytes(t);
  for(const j of t.tracks.keys()){btn.textContent=`Packing ${j+1} of ${t.tracks.length}…`;const f=await trackFile(t,j,cover);z.file(f.name,f.blob)}
  if(cover)z.file('cover.'+(cover.type.includes('png')?'png':'jpg'),cover.bytes);z.file('tracklist.txt',tracklist(t));btn.textContent='Saving ZIP…';
  const r=await dls.save({filename:safe(`${t.artist} - ${t.title}`)+'.zip',data:await z.generateAsync({type:'blob',compression:'STORE'})});toast('ZIP saved to '+r.where)}
 catch(err){saveErr(err)}btn.disabled=false;btn.innerHTML=old}
async function saveToPhone(t,btn){if(!(await gate(t)))return;const old=btn.innerHTML;btn.disabled=true;let where='';try{const cover=await coverBytes(t);
  for(const j of t.tracks.keys()){btn.textContent=`Saving ${j+1} of ${t.tracks.length}…`;const f=await trackFile(t,j,cover);where=(await dls.save({filename:f.name,data:f.blob,folder:folderFor(t)})).where}
  if(cover)await dls.save({filename:'cover.jpg',data:new Blob([cover.bytes]),folder:folderFor(t)});toast(`${t.tracks.length} MP3s saved to ${where.replace(/\/[^/]*$/,'')}`)}
 catch(err){saveErr(err)}btn.disabled=false;btn.innerHTML=old}

// ---------- ringtones ----------
async function makeRingtone(t,j,start,len){const buf=await (await fetch(await audioURL(t.tracks[j].asset))).arrayBuffer();const ac=new (window.AudioContext||window.webkitAudioContext)();const ab=await ac.decodeAudioData(buf);ac.close?.();
 const sr=ab.sampleRate,ch=Math.min(2,ab.numberOfChannels),s0=Math.floor(start*sr),n=Math.max(0,Math.min(Math.floor(len*sr),ab.length-s0)),fade=Math.floor(.5*sr);
 const v=new DataView(new ArrayBuffer(44+n*ch*2)),W=(o,s)=>{for(let i=0;i<s.length;i++)v.setUint8(o+i,s.charCodeAt(i))};
 W(0,'RIFF');v.setUint32(4,36+n*ch*2,true);W(8,'WAVEfmt ');v.setUint32(16,16,true);v.setUint16(20,1,true);v.setUint16(22,ch,true);v.setUint32(24,sr,true);v.setUint32(28,sr*ch*2,true);v.setUint16(32,ch*2,true);v.setUint16(34,16,true);W(36,'data');v.setUint32(40,n*ch*2,true);
 const d=[...Array(ch)].map((_,c)=>ab.getChannelData(c));let o=44;for(let i=0;i<n;i++){const g=Math.min(1,i/fade,(n-i)/fade);for(let c=0;c<ch;c++){v.setInt16(o,Math.max(-1,Math.min(1,d[c][s0+i]*g))*32767,true);o+=2}}
 return new Blob([v],{type:'audio/wav'})}
let ringPrev=null,justMade='';
function openRing(t,j){const tr=t.tracks[j],dur=Math.max(5,tr.dur||30);modal(`<div class="kick">Ringtone</div><h2 style="margin:4px 0 2px">${esc(tr.title)}</h2><p class="sub">${esc(t.artist)} · pick the part you want</p>
 <label for="rg_s">Start at <b id="rg_sv">0:00</b></label><input type="range" id="rg_s" min="0" max="${Math.max(0,Math.floor(dur-15))}" value="${Math.min(Math.floor(dur*.3),Math.max(0,Math.floor(dur-30)))}">
 <label>Length</label><div class="chips">${[15,20,30,40].map(s=>`<button class="chip ${s===30?'on':''}" data-rl="${s}">${s}s</button>`).join('')}</div>
 <div class="row" style="margin-top:18px"><button class="btn ghost" id="rg_p">${ic('play')} Preview</button><button class="btn" id="rg_go">${ic('ring')} Create ringtone</button></div>
 <p class="sub" style="margin-top:14px;font-size:13px">Android: Settings › Sound › Ringtone, then pick it from Documents/SovereignTapes/Ringtones. iPhone: open the file in GarageBand, then Share › Ringtone.</p>`);
 let len=30;const s=$('#rg_s'),sv=()=>{$('#rg_sv').textContent=fmt(+s.value);s.style.setProperty('--p',(s.value/(s.max||1))*100+'%')};s.oninput=sv;sv();
 $('#mbox').onclick=async e=>{const b=e.target.closest('[data-rl],#rg_p,#rg_go');if(!b)return;
  if(b.dataset.rl){len=+b.dataset.rl;$$('[data-rl]').forEach(x=>x.classList.toggle('on',x===b))}
  else if(b.id==='rg_p'){if(ringPrev){ringPrev.pause();ringPrev=null;b.innerHTML=ic('play')+' Preview';return}A.pause();ringPrev=new Audio(await audioURL(tr.asset));ringPrev.currentTime=+s.value;ringPrev.play();b.innerHTML=ic('pause')+' Stop';
   const end=+s.value+len;ringPrev.ontimeupdate=()=>{if(ringPrev&&ringPrev.currentTime>=end){ringPrev.pause();ringPrev=null;b.innerHTML=ic('play')+' Preview'}}}
  else if(b.id==='rg_go'){if(!(await gate(t)))return;b.disabled=true;b.textContent='Creating…';try{const blob=await makeRingtone(t,j,+s.value,len);const sv2=await dls.save({filename:safe(`${tr.title} (ringtone)`)+'.wav',data:blob,folder:'SovereignTapes/Ringtones'});toast('Ringtone saved to '+sv2.where);closeModal()}catch(err){if(!/declin|cancel/.test(err?.code||''))toast('Could not create ringtone: '+(err.message||'error'));b.disabled=false;b.innerHTML=ic('ring')+' Create ringtone'}}}}

// ---------- modal ----------
function modal(html){let m=$('#modal');if(!m){m=document.createElement('div');m.id='modal';m.innerHTML='<div id="mbox" role="dialog" aria-modal="true"></div>';document.body.appendChild(m);m.addEventListener('click',e=>{if(e.target===m)closeModal()})}
 $('#mbox').innerHTML=`<button class="ib mclose" data-close title="Close">${ic('x')}</button>`+html;m.hidden=false}
function closeModal(){const m=$('#modal');if(m)m.hidden=true;if(ringPrev){ringPrev.pause();ringPrev=null}}
function openSponsor(t){const link=CFG.SPONSOR_PAYMENT_LINK,pend=S.sponsor_requests.find(r=>r.tape===t.id&&r.by===me);
 modal(`<div class="kick">Promote</div><h2 style="margin:4px 0 6px">Sponsor “${esc(t.title)}”</h2><p class="sub">Sponsored tapes are featured on the front page and anyone can download them free, even without an account.</p>
 ${sponsoredUntil(t)?`<div class="note" style="margin-top:12px">Sponsored until ${new Date(sponsoredUntil(t)).toLocaleDateString()}.</div>`:''}
 ${pend?`<div class="note" style="margin-top:12px">Your ${pend.days}-day request is waiting for approval.</div>`:`<div class="pk">${PACKAGES.map(p=>`<div class="panel"><b style="font-size:20px">${p.days} days</b><div class="sub">${esc(p.price)}</div>
  ${p.link&&canBuy()?`<a class="btn" href="${esc(p.link)}?client_reference_id=sp_${t.id}_${p.days}${me?'&prefilled_email='+encodeURIComponent(user.email()):''}" target="_blank" rel="noopener">Pay ${esc(p.price)}</a>`:`<button class="btn" data-sreq="${p.days}" data-price="${esc(p.price)}">Request sponsorship</button>`}</div>`).join('')}</div>
  <p class="sub" style="font-size:13px;margin-top:12px">${PACKAGES.some(p=>p.link)&&canBuy()?'Secure checkout by Stripe. Your sponsorship starts automatically as soon as payment goes through.':'SovereignTapes will contact you to arrange payment, then turn on your sponsorship.'}</p>`}`);
 $('#mbox').onclick=async e=>{const b=e.target.closest('[data-sreq]');if(!b)return;b.disabled=true;
  try{await db.collection('sponsor_requests').doc().set({tape:t.id,title:t.title,artist:t.artist,by:me,days:+b.dataset.sreq,price:b.dataset.price,ts:Date.now()});toast('Request sent');closeModal()}catch(err){toast('Could not send: '+err.message);b.disabled=false}}}

// ---------- player ----------
const A=$('#audio');let queue=[],qi=0,curTape=null,shuffle=false,repeat=false;
async function playTape(t,i=0){if(!t)return;if(!live(t))return toast('Not released yet. Set a reminder.');curTape=t;queue=t.tracks.map((_,j)=>j);qi=i;await load();
 if(db&&navigator.onLine)db.rpc('record_play',{p_tape:t.id,p_region:REGION}).catch(()=>{})}
function setAll(cls,fn){$$(cls).forEach(fn)}
function syncNow(){const t=curTape;if(!t)return;const tr=t.tracks[queue[qi]];
 setAll('.js-cover',e=>e.src=coverURL(t));setAll('.js-title',e=>e.textContent=tr.title+(tr.feat?` (feat. ${tr.feat})`:''));setAll('.js-artist',e=>e.textContent=t.artist);setAll('.js-tape',e=>e.textContent=t.title);
 $('#npbg').style.backgroundImage=`url("${coverURL(t)}")`;$('#mini').classList.add('show');syncLike();setAll('.js-dl',e=>e.hidden=!(t.allowDl&&dls));
 $('#npq').innerHTML=t.tracks.map((x,j)=>`<div class="tr${j===queue[qi]?' on':''}" data-tape="${t.id}" data-j="${j}"><span class="n">${j===queue[qi]&&!A.paused?ic('chart'):j+1}</span><div style="min-width:0"><b>${esc(x.title)}</b>${x.feat?`<div class="d">feat. ${esc(x.feat)}</div>`:''}</div><span class="d">${fmt(x.dur)}</span><span></span></div>`).join('');markRows()}
function mediaSession(t,tr){if(!('mediaSession' in navigator)||!t)return;try{navigator.mediaSession.metadata=new MediaMetadata({title:tr.title,artist:t.artist,album:t.title,artwork:[{src:coverURL(t),sizes:'500x500'}]});
 for(const [k,f] of [['play',()=>A.play()],['pause',()=>A.pause()],['nexttrack',()=>step(1)],['previoustrack',()=>act('prev')]])navigator.mediaSession.setActionHandler(k,f)}catch{}}
function syncLike(){const on=liked(curTape);setAll('.js-like',e=>{e.classList.toggle('on',on);e.innerHTML=ic(on?'heartf':'heart')})}
const POSK='st_pos',posKey=()=>curTape?curTape.id+':'+queue[qi]:'';let posAt=0;
const savePos=()=>{const k=posKey();if(!k||!A.duration)return;const all=LS.get(POSK,{});if(A.currentTime>30&&A.currentTime<A.duration-20)all[k]=Math.floor(A.currentTime);else delete all[k];
 const ks=Object.keys(all);if(ks.length>200)delete all[ks[0]];LS.set(POSK,all)};
async function load(){const tr=curTape.tracks[queue[qi]];syncNow();setAll('.js-title',e=>e.textContent='Loading…');
 try{A.src=await audioURL(tr.asset);A.playbackRate=speed;mediaSession(curTape,tr);const at=LS.get(POSK,{})[posKey()];
  if(at)A.addEventListener('loadedmetadata',()=>{if(at<A.duration-20){A.currentTime=at;toast('Picked up where you left off · '+fmt(at))}},{once:true});await A.play()}catch(e){toast('Could not play this track: '+(e.message||'error'))}syncNow()}
function markRows(){$$('#app .tr[data-j]').forEach(r=>r.classList.toggle('on',!!curTape&&r.dataset.tape===curTape.id&&+r.dataset.j===queue[qi]))}
function step(d){if(!queue.length)return;qi=shuffle&&d>0?Math.floor(Math.random()*queue.length):(qi+d+queue.length)%queue.length;load()}
const openNP=o=>{if(o&&!curTape)return toast('Pick a tape to start');$('#np').classList.toggle('open',o)};
A.onplay=A.onpause=()=>{setAll('.js-pp',e=>e.innerHTML=ic(A.paused?'play':'pause'));if(curTape)syncNow()};
A.onended=()=>{savePos();if(sleepEnd===-1){sleepEnd=0;setSleepLabel();return toast('Sleep timer: stopped at the end of the track')}if(repeat)return A.play();if(qi<queue.length-1||shuffle)step(1)};
let dragging=false;
A.ontimeupdate=()=>{if(Date.now()-posAt>5000){posAt=Date.now();savePos()}if(sleepEnd>0&&Date.now()>=sleepEnd){sleepEnd=0;A.pause();setSleepLabel();toast('Sleep timer: paused')}const p=A.duration?A.currentTime/A.duration:0;setAll('.js-cur',e=>e.textContent=fmt(A.currentTime));setAll('.js-dur',e=>e.textContent=fmt(A.duration));
 if(!dragging)setAll('.js-seek',e=>{e.value=p*1000;e.style.setProperty('--p',p*100+'%')});$('.js-prog').style.width=p*100+'%'};
$$('.js-seek').forEach(s=>{s.oninput=()=>{dragging=true;s.style.setProperty('--p',s.value/10+'%')};s.onchange=()=>{dragging=false;if(A.duration)A.currentTime=s.value/1000*A.duration}});
const vol=$('#vol');vol.oninput=()=>{A.volume=vol.value;vol.style.setProperty('--p',vol.value*100+'%')};vol.oninput();
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();openNP(false);return}if(/INPUT|TEXTAREA|SELECT|BUTTON/.test(e.target.tagName))return;if(e.code==='Space'){e.preventDefault();act('pp')}});
let speed=LS.get('st_speed',1),sleepEnd=0;const SPEEDS=[1,1.25,1.5,2,0.75],SLEEPS=[15,30,60,-1,0];
const setSleepLabel=()=>setAll('.js-sleepl',e=>e.textContent=sleepEnd===-1?'End of track':sleepEnd>0?Math.ceil((sleepEnd-Date.now())/6e4)+' min':'Sleep');
setInterval(()=>{if(sleepEnd>0)setSleepLabel()},30000);
setAll('.js-speed',e=>e.textContent=speed+'×');
async function act(a){const t=curTape;
 if(a==='speed'){speed=SPEEDS[(SPEEDS.indexOf(speed)+1)%SPEEDS.length];A.playbackRate=speed;LS.set('st_speed',speed);setAll('.js-speed',e=>e.textContent=speed+'×');return}
 if(a==='sleep'){const cur=sleepEnd===-1?-1:sleepEnd>0?Math.round((sleepEnd-Date.now())/6e4):0,i=SLEEPS.findIndex(m=>m===cur),n=SLEEPS[(i<0?SLEEPS.length-1:i)+1]??SLEEPS[0];
  sleepEnd=n>0?Date.now()+n*6e4:n;setSleepLabel();toast(n>0?`Sleep timer: ${n} minutes`:n===-1?'Sleep timer: end of this track':'Sleep timer off');return}
 if(a==='pp'){if(!A.src)return;A.paused?A.play():A.pause()}else if(a==='next')step(1);else if(a==='prev')A.currentTime>3?A.currentTime=0:step(-1);
 else if(a==='shuf'){shuffle=!shuffle;setAll('.js-shuf',e=>e.classList.toggle('on',shuffle))}else if(a==='rep'){repeat=!repeat;setAll('.js-rep',e=>e.classList.toggle('on',repeat))}
 else if(a==='open')openNP(true);else if(a==='close')openNP(false);else if(a==='gotape'&&t){openNP(false);location.hash='tape-'+t.id}
 else if(a==='like'&&t)toggleLike(t.id);else if(a==='dl'&&t)download(t,queue[qi])}

// ---------- views ----------
const badgeChip=t=>{const b=badge(t);return b?`<span class="bdg" style="--b:${b[2]}">${ic('starf')}${b[1]}</span>`:''};
const FORMATS=['Album','EP','Single','Mixtape'],fmtOf=t=>FORMATS.includes(t.format)?t.format:'Mixtape',FMTP={Album:'Albums',EP:'EPs',Single:'Singles',Mixtape:'Mixtapes'};
const YTID=/^[\w-]{11}$/,ytId=u=>{try{const x=new URL(String(u).trim());const h=x.hostname.replace(/^(www|m|music)\./,'');let id='';
 if(h==='youtu.be')id=x.pathname.slice(1).split('/')[0];else if(h==='youtube.com'||h==='youtube-nocookie.com')id=x.searchParams.get('v')||(x.pathname.match(/^\/(?:shorts|embed|live|v)\/([\w-]{11})/)||[])[1]||'';
 return YTID.test(id)?id:''}catch{return''}};
const vids=t=>(Array.isArray(t.videos)?t.videos:[]).filter(v=>okPath(v.asset)||YTID.test(v.yt||'')),VIDOK=/^video\/(mp4|webm|quicktime)$/,VMAX=50*1024*1024;
const vidCard=(t,v)=>`<div class="vcard">${v.yt?`<iframe src="https://www.youtube-nocookie.com/embed/${v.yt}?rel=0&amp;playsinline=1" title="${esc(v.title||t.title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`:`<video controls playsinline preload="metadata" src="${Backend.url(v.asset)}"${okPath(t.coverId)?` poster="${Backend.url(t.coverId)}"`:''}></video>`}<div class="t">${esc(v.title||t.title)}</div><div class="a"><a href="#tape-${t.id}">${esc(t.artist)} · ${esc(t.title)}</a>${v.yt?` · <a href="https://www.youtube.com/watch?v=${v.yt}" target="_blank" rel="noopener">Watch on YouTube</a>`:''}</div></div>`;
const tile=(t,rank)=>`<div class="tile" data-go="#tape-${t.id}" tabindex="0"><div class="cv"><img decoding="async" loading="lazy" src="${coverURL(t)}" alt="">${live(t)?tagFor(t):`<span class="tag lime">Drops ${new Date(t.release).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</span>`}
 ${badge(t)?`<span class="tag r" style="color:${badge(t)[2]}">${ic('starf')} ${badge(t)[1]}</span>`:''}${rank?`<span class="rank">${rank}</span>`:''}
 ${live(t)?`<button class="fab" data-play="${t.id}" aria-label="Play ${esc(t.title)}">${ic('play')}</button>`:''}</div><div class="t">${esc(t.title)}</div><div class="a">${fmtOf(t)!=='Mixtape'?fmtOf(t)+' · ':''}${esc(t.artist)}${t.host?' · '+esc(t.host):''}</div></div>`;
const row=(list,ranked,empty)=>list.length?`<div class="hs">${list.map((t,i)=>tile(t,ranked&&i+1)).join('')}</div>`:`<div class="empty">${empty||'Nothing here yet.'}</div>`;
const grid=(list,empty)=>list.length?`<div class="grid">${list.map(t=>tile(t)).join('')}</div>`:`<div class="empty">${empty||'Nothing here yet.'}</div>`;
const see=h=>`<a class="see" href="#${h}">See all ${ic('right')}</a>`;
const stars=(v,n)=>`<span class="stars" title="${v.toFixed(1)} out of 5">${[1,2,3,4,5].map(i=>ic(i<=Math.round(v)?'starf':'star')).join('')}</span>${n!==undefined?` <span class="d">${v?v.toFixed(1):'–'} (${n})</span>`:''}`;
const signinLink=w=>`<a href="#account" style="color:var(--acc)">Sign in</a> ${w}`;
const topbar=()=>`<div class="top"><div class="hello">Hello, <b>${esc(myName||'there')}</b> ✨</div><a class="rbtn" href="#upcoming" title="Upcoming drops">${ic('bell')}${reminders.length?'<span class="pip"></span>':''}</a>${isPlus()?'':`<a class="rbtn" href="#plus" title="SovereignTapes Plus" style="color:var(--acc)">${ic('crown')}</a>`}<a class="rbtn light" href="#upload" title="Drop a release">${ic('up2')}</a><a class="rbtn" href="#account" title="Account">${ic('user')}</a></div>`;
const CHARTS={hot:['Hot','Moving fastest right now',()=>trending()],
 month:['Top of the Month','Most streams + downloads, released in the last 30 days',()=>released().filter(t=>Date.now()-t.release<30*864e5).sort((a,b)=>total(b)-total(a))],
 new:['New','Latest releases',()=>released().sort((a,b)=>b.release-a.release)],
 celebrated:['Celebrated','Tapes that reached Gold or higher',()=>released().filter(t=>total(t)>=25000).sort((a,b)=>total(b)-total(a))]};
const V={
home(){if(!S.tapes.length)return topbar()+`<section class="hero"><div class="cv"><img decoding="async" loading="lazy" src="${coverURL({id:'_e',title:'Your tape here',artist:'SovereignTapes',hue:[75,200]})}" alt=""></div><div><div class="kick">The wall is empty</div><h1>Be the first tape on SovereignTapes.</h1>
  <p class="sub">Sign up as an Artist, upload your cover and tracks, credit the DJ who hosted it, and pick a release time.</p><a class="btn" href="#upload" style="margin-top:12px">${ic('plus')} Drop a release</a></div></section>`;
 const g=homeG,f=l=>g?l.filter(t=>t.genre===g):l,tr=f(trending()),fresh=f(released().sort((a,b)=>b.release-a.release)),up=upcoming(),top=trending()[0],nu=up[0],fe=featured();
 const spot=released().filter(t=>boosted(t,'home'));
 return topbar()+ticker()+(spot.length?`<h2 style="margin-top:0">Spotlight</h2>${row(spot,false,'')}`:'')+countHero()+(fe.length?`<h2 style="margin-top:0">Featured <span class="d" style="font-weight:500">sponsored · free downloads</span></h2><div class="coll feat">${fe.slice(0,8).map(t=>`<div class="ft" data-go="#tape-${t.id}"><img decoding="async" loading="lazy" src="${coverURL(t)}" alt=""><div><span class="tag lime" style="position:static">Sponsored</span><h3>${esc(t.title)}</h3><p>${esc(t.artist)}${t.host?' · Hosted by '+esc(t.host):''}</p><button class="btn" data-play="${t.id}">${ic('play')} Play</button></div></div>`).join('')}</div>`:'')+
 `<h2>Select categories</h2><div class="chips"><button class="chip ${!g?'on':''}" data-hg="">All</button>${GENRES.map(x=>`<button class="chip ${g===x?'on':''}" data-hg="${x}">${x}</button>`).join('')}</div>
 <h2>Hot right now ${see('charts')}</h2>${row(tr.slice(0,12),false,'No '+esc(g)+' tapes yet.')}
 <h2>World Premieres ${see('premieres')}</h2>${row(f(trending().filter(isPremiere)).slice(0,12),false,'No World Premieres'+(g?' in '+esc(g):'')+' yet.')}
 <h2>Indy ${see('indy')}</h2>${row(f(trending().filter(t=>!isPremiere(t))).slice(0,12),false,'No indy tapes'+(g?' in '+esc(g):'')+' yet.')}${promo()}${djRow()}
 <h2>New collection</h2><div class="coll">
  <div class="bn w" data-go="#charts"><h3>Top tapes this month</h3><p>${released().length} tape${released().length===1?'':'s'} ranked by streams and downloads</p><span class="go">${ic('arrow')}</span>${top?`<img decoding="async" loading="lazy" src="${coverURL(top)}" alt="">`:''}</div>
  <div class="bn b" data-go="#upcoming"><h3>Upcoming drops</h3><p>${up.length?up.length+' scheduled · countdowns live':'Nothing scheduled yet'}</p><span class="go">${ic('arrow')}</span>${nu?`<img decoding="async" loading="lazy" src="${coverURL(nu)}" alt="">`:''}</div>
  <div class="bn l" data-go="#upload"><h3>Drop your tape</h3><p>Free for artists. Credit your DJ and schedule the release.</p><span class="go">${ic('arrow')}</span></div></div>
 <h2>New ${see('explore')}</h2>${row(fresh.slice(0,12),false,'No fresh drops in this category.')}`+
 (offline.size?`<h2>Saved on this device ${see('library')}</h2>${row(S.tapes.filter(t=>offline.has(t.id)).slice(0,12))}`:'')+
 (S.follows.some(x=>x.by===me)?`<h2>From artists you follow</h2>${row(released().filter(t=>following(t.artist)||t.host&&following(t.host)).slice(0,12),false,'No releases yet from artists you follow.')}`:'')},
explore(){const q=query.toLowerCase(),hit=t=>[t.title,t.artist,t.host,t.genre,...t.tracks.map(x=>x.title+' '+x.feat)].join(' ').toLowerCase().includes(q);
 const box=`<label class="sbox">${ic('search')}<input id="q" placeholder="Search tapes, artists, DJs, hosts, tracks" value="${esc(query)}" aria-label="Search"></label>`;
 if(q){let l=released().filter(hit);l.sort(sortBy==='plays'?(a,b)=>total(b)-total(a):sortBy==='rated'?(a,b)=>rating(b)-rating(a):(a,b)=>b.release-a.release);
  const hosts=[...new Set(released().filter(t=>t.host&&t.host.toLowerCase().includes(q)).map(t=>t.host))],arts=[...new Set(released().filter(t=>t.artist.toLowerCase().includes(q)).map(t=>t.artist))];
  return box+`${arts.length||hosts.length?`<h2>Artists &amp; DJs</h2><div class="chips">${arts.map(a=>`<a class="chip" href="#artist-${hkey(a)}">${ic('user')} ${esc(a)}</a>`).join('')}${hosts.map(h=>`<a class="chip" href="#dj-${hkey(h)}">${ic('disc')} ${esc(h)}</a>`).join('')}</div>`:''}
  <h2>Tapes <span class="d" style="font-weight:500">${l.length}</span></h2><div class="chips" style="margin-bottom:16px">${[['new','Newest'],['plays','Most played'],['rated','Top rated']].map(([k,n])=>`<button class="chip ${sortBy===k?'on':''}" data-sort="${k}">${n}</button>`).join('')}</div>${grid(l,'No tapes match that search.')}`}
 const tr=trending().slice(0,10);
 return box+`<div class="chips" style="margin:4px 0 14px">${FORMATS.map(f=>`<a class="chip" href="#format-${f}">${FMTP[f]}</a>`).join('')}<a class="chip" href="#videos">${ic('play')} Music videos</a></div>`+splitTabs()+djRow()+`<h2>Explore SovereignTapes</h2>${tr.length?`<div class="ex">${tr.map(t=>`<div class="tile" data-go="#tape-${t.id}" tabindex="0"><div class="cv"><img decoding="async" loading="lazy" src="${coverURL(t)}" alt=""><span class="cap">#${esc(t.genre.replace(/[^A-Za-z]/g,''))}Tapes</span></div><div class="t">${esc(t.title)}</div><div class="a">${esc(t.artist)}</div></div>`).join('')}</div>`:'<div class="empty">Tapes appear here once artists start dropping.</div>'}
 ${stories().length?`<h2>${ic('news')} Editorials <a class="d" href="#news" style="font-size:14px;font-weight:600">See all</a></h2>${storyList(stories().slice(0,4),'')}`:''}<h2>Mood &amp; genres</h2><div class="moods">${GENRES.map(g=>{const t=trending().find(x=>x.genre===g);return`<button class="mood" style="background:${GCOL[g]}" data-genre="${g}">${g}${t?`<img decoding="async" loading="lazy" src="${coverURL(t)}" alt="">`:''}</button>`}).join('')}</div>`},
videos(){const l=released().filter(t=>vids(t).length&&!(t.members&&!mine(t)&&!memberOf(t.by))).sort((a,b)=>b.release-a.release);
 return`<div class="kick">Watch</div><h1>Music videos</h1><p class="sub">The newest videos from artists on SovereignTapes.</p><div class="vgrid" style="margin-top:14px">${l.flatMap(t=>vids(t).map(v=>vidCard(t,v))).join('')||'<div class="empty">Music videos show up here once artists add them.</div>'}</div>`},
format(f){f=decodeURIComponent(f);if(!FORMATS.includes(f))return'<div class="empty">Not found.</div>';const l=released().filter(t=>fmtOf(t)===f).sort((a,b)=>b.release-a.release);return`<div class="kick">Browse</div><h1>${FMTP[f]}</h1><p class="sub">${l.length} release${l.length===1?'':'s'}, newest first.</p><div style="height:14px"></div>${grid(l,'No '+FMTP[f].toLowerCase()+' yet.')}`},
genre(g){g=decodeURIComponent(g);const l=released().filter(t=>t.genre===g).sort((a,b)=>score(b)-score(a));return`<div class="kick">Genre</div><h1>${esc(g)}</h1><p class="sub">${l.length} tape${l.length===1?'':'s'}, hottest first.</p><div style="height:14px"></div>${grid(l,'No '+esc(g)+' tapes yet.')}`},
charts(){const [name,desc,fn]=CHARTS[chartTab],tr=fn().filter(t=>chartScope==='all'||(chartScope==='prem')===isPremiere(t)).slice(0,50);
 const spot=released().filter(t=>boosted(t,'charts'));return `${spot.length?`<div class="kick">Spotlight</div>${row(spot,false,'')}`:''}<div class="kick">Charts</div><h1>${name}</h1><p class="sub">${desc}.</p><div class="chips" style="margin:14px 0 6px">${Object.entries(CHARTS).map(([k,v])=>`<button class="chip ${chartTab===k?'on':''}" data-ct="${k}">${v[0]}</button>`).join('')}</div><div class="chips" style="margin-bottom:6px">${[['all','All'],['prem','World Premieres'],['indy','Indy']].map(([k,n])=>`<button class="chip ${chartScope===k?'on':''}" data-cs="${k}">${n}</button>`).join('')}</div>
 <div class="list chart">${tr.map((t,i)=>`<div class="tr" data-go="#tape-${t.id}"><span class="n">${i+1}</span><img decoding="async" loading="lazy" src="${coverURL(t)}" alt=""><div style="min-width:0"><b>${esc(t.title)}</b><div class="d">${esc(t.artist)} · ${esc(t.genre)}${sponsoredUntil(t)?' · Sponsored':''}</div></div><span class="d" style="text-align:right">${badgeChip(t)}<br>${num(st(t).plays)} streams · ${num(st(t).downloads)} dl</span></div>`).join('')||'<div class="empty">Nothing on this chart yet.</div>'}</div>
 <p class="sub" style="font-size:13px;margin-top:18px">Badges by streams + downloads: ${BADGES.slice().reverse().map(b=>`${b[1]} ${num(b[0])}`).join(' · ')}.</p>`},
upcoming(){const l=upcoming();return `<div class="kick">Countdown</div><h1>Upcoming drops</h1><p class="sub">Every scheduled release, ticking down to the second. Tap “Remind me” and you'll get an alert here when it goes live.</p>
 <div class="uplist">${l.map(t=>`<div class="upr" data-go="#tape-${t.id}"><img decoding="async" loading="lazy" src="${coverURL(t)}" alt=""><div style="min-width:0"><div class="kick">${isPremiere(t)?'World Premiere':'Indy'}</div><b>${esc(t.title)}</b><div class="d">${esc(t.artist)}${t.host?' · Hosted by '+esc(t.host):''}</div><div class="d">${new Date(t.release).toLocaleString(undefined,{weekday:'short',month:'short',day:'numeric',hour:'numeric',minute:'2-digit'})}</div></div>${cdBox(t.release)}
 <button class="ib ${reminders.includes(t.id)?'on':''}" data-rem="${t.id}" title="${reminders.includes(t.id)?'Reminder set':'Remind me'}">${ic('bell')}</button></div>`).join('')||'<div class="empty">No scheduled drops right now.</div>'}</div>`},
premieres(){const l=sorted(released().filter(isPremiere));return `<div class="kick">Official releases</div><h1>World Premieres</h1><p class="sub">Major-label and established street releases, verified by SovereignTapes.</p>${sortChips()}${grid(l,'No World Premieres yet.')}`},
indy(){const l=sorted(released().filter(t=>!isPremiere(t)));return `<div class="kick">Underground</div><h1>Indy</h1><p class="sub">Independent uploads straight from artists. The next wave starts here.</p>${sortChips()}${grid(l,'No indy tapes yet.')}`},
djs(){const l=djList();return `<div class="kick">Hosts</div><h1>DJs &amp; hosts</h1><p class="sub">Browse the catalog by the DJ who hosted it.</p><label class="sbox" style="margin:16px 0">${ic('search')}<input id="djq" placeholder="Find a DJ" aria-label="Find a DJ"></label>
 ${l.length?`<div class="djs grid">${l.map(djCard).join('')}</div>`:'<div class="empty">No hosted tapes yet. Add a DJ in “Hosted by” when you drop a tape.</div>'}`},
dj(key){const all=S.tapes.filter(t=>t.host&&hkey(t.host)===key).sort((a,b)=>b.release-a.release),acct=S.profiles.find(p=>p.dj_name&&hkey(p.dj_name)===key);
 const book=acct&&acct.host_open&&acct.host_price&&payReady(acct.id)&&acct.id!==me?`<button class="btn" data-book="${acct.id}">${ic('disc')} Book to host your tape · ${money(acct.host_price)}</button>`:'';
 if(!all.length)return acct?`${banner(acct.id)}${avatarImg(acct.id)?`<div class="avsm">${avatarImg(acct.id)}</div>`:''}<div class="kick">DJ · Host</div><h1>${esc(acct.dj_name)} ${proChip(acct.id)}</h1>${atName(acct.id)}${acct.dj_bio?`<p class="sub">${esc(acct.dj_bio)}</p>`:''}<div class="row" style="margin-top:14px">${book}${bookBtn(acct.id)}</div>${showList(acct.id)}${demandBox(acct.id,acct.dj_name)}`:'<div class="empty">DJ not found.</div>';const name=all[0].host,f=following(name),rel=all.filter(live),arts=[...new Set(all.map(t=>t.artist))];
 return `${banner(acct?.id)}<section class="hero"><div class="cv">${avatarImg(acct?.id)||`<img decoding="async" loading="lazy" src="${coverURL(all[0])}" alt="">`}</div><div><div class="kick">DJ · Host</div><h1>${esc(name)}</h1>${atName(acct?.id)}<div class="stats"><div><b>${all.length}</b>tapes hosted</div><div><b>${num(rel.reduce((a,t)=>a+st(t).plays,0))}</b>streams</div><div><b>${arts.length}</b>artists</div><div><b>${num(followers(name))}</b>followers</div></div>
 <div class="row"><button class="btn ${f?'on':''}" data-follow="${esc(name)}">${f?'Following':'+ Follow DJ'}</button>${book}${acct?bookBtn(acct.id):''}</div>${acct?.dj_bio?`<p class="sub" style="margin-top:10px">${esc(acct.dj_bio)}</p>`:''}</div></section>
 <h2>Artists hosted</h2><div class="chips">${arts.map(a=>`<a class="chip" href="#artist-${hkey(a)}">${ic('user')} ${esc(a)}</a>`).join('')}</div>
 ${all.some(t=>!live(t))?`<h2>Coming soon</h2>${grid(all.filter(t=>!live(t)))}`:''}${acct?showList(acct.id)+demandBox(acct.id,acct.dj_name||name):''}<h2>Hosted tapes</h2>${grid(sorted(rel),'No released tapes yet.')}`},
library(){const off=S.tapes.filter(t=>offline.has(t.id));let h=`<h1>Your library</h1><h2>${ic('phone')} Saved on this device <span class="d" style="font-weight:500">plays offline</span></h2>${row(off,false,'Tap “Save offline” on any tape to listen without internet.')}`;
 if(!me)return h+`<div class="note" style="margin-top:24px">${signinLink('to keep likes, follows and reminders.')}</div>`;
 const lk=S.tapes.filter(liked),fl=[...new Set(S.follows.filter(f=>f.by===me).map(f=>f.artist))],my=S.tapes.filter(t=>t.by===me);
 const col=S.unlocks.filter(u=>u.buyer===me&&u.no).sort((a,b)=>b.ts-a.ts);if(col.length)h+=`<h2>${ic('crown')} Your collection</h2><div class="chips">${col.map(u=>{const t=S.tapes.find(x=>x.id===u.tape);return t?`<a class="chip copyno" href="#tape-${t.id}">${esc(t.title)} · #${u.no}${+t.edition?' of '+t.edition:''}</a>`:''}).join('')}</div>`;
 return h+`<h2>Liked tapes</h2>${row(lk,false,'Tapes you like show up here.')}<h2>Following</h2>${fl.length?`<div class="chips">${fl.map(a=>`<a class="chip" href="${personHref(a)}">${esc(a)}</a>`).join('')}</div>`:'<div class="empty">Follow artists to see their drops on Home.</div>'}
 <h2>Reminders</h2>${row(S.tapes.filter(t=>reminders.includes(t.id)&&!live(t)),false,'No reminders set.')}${isArtist()?`<h2>Your uploads ${see('stats')}</h2>${row(my,false,'Tapes you drop show up here.')}`:''}`},
artist(key){const l=S.tapes.filter(t=>hkey(t.artist)===key).sort((a,b)=>b.release-a.release);if(!l.length)return'<div class="empty">Artist not found.</div>';const name=l[0].artist,f=following(name),owner=l[0].by,pf=prof(owner);
 return `${banner(owner)}<section class="hero"><div class="cv">${avatarImg(owner)||`<img decoding="async" loading="lazy" src="${coverURL(l[0])}" alt="">`}</div><div><div class="kick">Artist</div><h1>${esc(name)} ${proChip(owner)}</h1>${atName(owner)}<div class="stats"><div><b>${l.length}</b>tapes</div><div><b>${num(l.reduce((a,t)=>a+st(t).plays,0))}</b>streams</div><div><b>${num(l.reduce((a,t)=>a+st(t).downloads,0))}</b>downloads</div><div><b>${num(followers(name))}</b>followers</div></div>
 <div class="row"><button class="btn ${f?'on':''}" data-follow="${esc(name)}">${f?'Following':'+ Follow'}</button>${supportBtns(owner)}${bookBtn(owner)}</div>${pf.member_perks&&pf.member_price&&payReady(owner)?`<p class="sub" style="font-size:13px;margin-top:10px">Members get: ${esc(pf.member_perks)}</p>`:''}</div></section>${showList(owner)}${demandBox(owner,name)}<h2>Discography</h2>${grid(l)}`},
tape(id){const t=S.tapes.find(x=>x.id===id);if(!t)return id===justMade||status!=='ready'?'<div class="empty">Loading your tape…</div>':'<div class="empty">This tape was removed or the link is wrong.</div>';const L=live(t),s=st(t),dur=t.tracks.reduce((a,x)=>a+(x.dur||0),0),sp=sponsoredUntil(t),off=offline.has(t.id);
 const cms=S.comments.filter(c=>c.tape===id&&!isBlocked(c.by)).sort((a,b)=>b.ts-a.ts),del=mine(t)?`<button class="btn ghost" data-del="${t.id}">${ic('trash')} Delete</button>`:'';
 const locked=t.members&&!mine(t)&&!memberOf(t.by),forSale=t.price>0&&!owns(t);
 const dlNote=locked?`Members only. Join ${esc(t.artist)}'s membership to stream and download.`:forSale?`Streaming is free. Downloads are ${money(t.price)}, paid to the artist.`:!t.allowDl?'Downloads are off for this tape.':sp?'Sponsored: free download for everyone, no account needed.':me?'Counts toward your 4 free downloads a week.':'Free account needed to download.';
 return `<div class="tp"><div><div class="cv"><img decoding="async" fetchpriority="high" src="${coverURL(t)}" alt="Cover of ${esc(t.title)}"></div>${mine(t)&&L?`<div class="row" style="margin-top:14px;justify-content:center"><button class="btn ghost" data-promo="${t.id}">${ic('bolt')} ${sp?'Sponsored':'Promote'}</button><button class="btn ghost" data-boost="${t.id}">${ic('star')} Boost</button><a class="btn ghost" href="#stats">${ic('chart')} Analytics</a></div>`:''}</div><div>
 <div class="kick">${isPremiere(t)?'World Premiere':'Indy'} · ${fmtOf(t)} · ${esc(t.genre)}${t.explicit?' · Explicit':''}${sp?' · Sponsored':''}${justDropped(t)?' · Just dropped':''}</div><h1>${esc(t.title)}</h1>${myRole==='admin'?`<button class="chip" data-prem="${t.id}" style="margin-bottom:8px">${ic('star')} ${isPremiere(t)?'Move to Indy':'Make World Premiere'}</button>`:''}
 <div class="meta"><a href="#artist-${hkey(t.artist)}"><b>${esc(t.artist)}</b></a>${t.host?`<span>Hosted by <a href="#dj-${hkey(t.host)}" style="color:var(--text);font-weight:700">${esc(t.host)}</a></span>`:''}<span>${t.tracks.length} tracks · ${fmt(dur)}</span><span>${L?'Released '+ago(t.release):'Drops '+new Date(t.release).toLocaleString()}</span></div>
 ${L?`<div class="row" style="margin-bottom:12px">${badgeChip(t)}${edChip(t)}${stars(rating(t),s.rn)}</div><div class="stats"><div><b>${num(s.plays)}</b>streams</div><div><b>${num(s.downloads)}</b>downloads</div><div><b>${num(s.likes)}</b>likes</div><div><b>${s.comments}</b>comments</div></div>
 <div class="row">${locked?(payReady(t.by)&&prof(t.by).member_price?`<button class="btn" data-join="${t.by}">${ic('crown')} Members only · Join ${money(prof(t.by).member_price)}/mo</button>`:`<span class="btn ghost">${ic('crown')} Members only</span>`):`<button class="btn" data-play="${t.id}">${ic('play')} Play tape</button>`}${forSale&&t.allowDl&&!locked?(soldOut(t)?`<span class="btn ghost">${ic('star')} Sold out</span>`:`<button class="btn ghost" data-buytape="${t.id}">${ic('dl')} Buy download · ${money(t.price)}</button>`):''}${t.allowDl&&!locked&&!forSale?`<button class="btn ghost" data-zip="${t.id}">${ic('dl')} Download ZIP</button>${Backend.isNative()?`<button class="btn ghost" data-mp3="${t.id}">${ic('phone')} MP3s to phone</button>`:''}<button class="btn ghost ${off?'on':''}" data-off="${t.id}">${ic(off?'check':'lib')} ${off?'In offline library':'Save offline'}</button>`:''}<button class="btn ghost ${liked(t)?'on':''}" data-like="${t.id}">${ic(liked(t)?'heartf':'heart')} ${liked(t)?'Liked':'Like'}</button><button class="btn ghost" data-share="${t.id}">${ic('link')} Copy link</button>
 <button class="btn ghost ${following(t.artist)?'on':''}" data-follow="${esc(t.artist)}">${following(t.artist)?'Following':'+ Follow'}</button>${supportBtns(t.by)}${del}</div><p class="sub" style="font-size:13px;margin-top:10px">${dlNote}</p>${myCopy(t)?`<p class="copyno">${ic('crown')} You own copy #${myCopy(t)}${+t.edition?' of '+t.edition:''}</p>`:''}
 ${mine(t)&&t.allowDl?(payReady(t.by)?`<form class="panel dlset" id="dlset" data-tape="${t.id}"><label class="sw"><input type="checkbox" id="ds_on" ${t.price>0?'checked':''}><span></span> Charge for downloads</label><span class="row" style="gap:8px"><span class="d">$</span><input type="text" id="ds_p" inputmode="decimal" value="${((t.price||t.listPrice||499)/100).toFixed(2)}" style="width:90px"><button class="btn">Save</button></span><label for="ds_ed" style="margin-top:8px">Limited edition: number of copies (blank = unlimited)</label><input type="text" id="ds_ed" inputmode="numeric" value="${+t.edition||''}" placeholder="e.g. 500" style="width:120px"></form>${splitForm(t)}`
  :`<p class="sub" style="font-size:13px"><a href="#earn" style="color:var(--acc)">Set up payouts</a> to charge for downloads of this tape.</p>`):''}
 ${me?`<div class="rate"><span class="d">Your rating</span>${[1,2,3,4,5].map(i=>`<button class="ib ${i<=myStars(t)?'on':''}" data-rate="${t.id}:${i}" aria-label="Rate ${i} star${i>1?'s':''}">${ic(i<=myStars(t)?'starf':'star')}</button>`).join('')}</div>`:`<p class="sub" style="font-size:13px">${signinLink('to rate and comment.')}</p>`}`
 :`<div class="panel cdpanel" style="margin:6px 0 10px"><div class="kick">${isPremiere(t)?'World Premiere drops in':'Drops in'}</div>${cdBox(t.release)}<p class="sub" style="font-size:13px;margin:10px 0 12px">${new Date(t.release).toLocaleString(undefined,{weekday:'long',month:'long',day:'numeric',hour:'numeric',minute:'2-digit'})}</p><div class="row"><button class="btn ${reminders.includes(t.id)?'on':''}" data-rem="${t.id}">${ic('bell')} ${reminders.includes(t.id)?'Reminder set':'Remind me'}</button>${del}</div></div>`}
 ${t.desc?`<p class="sub" style="margin-top:16px">${esc(t.desc)}</p>`:''}
 ${L&&!locked&&vids(t).length?`<h2>${ic('play')} Music videos</h2><div class="vgrid">${vids(t).map(v=>vidCard(t,v)).join('')}</div>`:''}${mine(t)?`<p style="margin-top:12px"><button class="btn ghost" data-addvid="${t.id}">${ic('plus')} Upload a music video</button> <span class="d" style="font-size:13px">MP4 or WebM, up to 50 MB</span></p><form class="row ytf" data-ytadd="${t.id}" style="max-width:560px;margin-top:8px"><input type="url" name="yt" placeholder="Or paste a YouTube link" style="flex:1;min-width:0" required><button class="btn ghost">${ic('play')} Add YouTube video</button></form>`:''}
 <div class="list">${t.tracks.map((x,j)=>`<div class="tr trk" data-tape="${t.id}" data-j="${j}"><span class="n">${j+1}</span><div style="min-width:0"><b>${esc(x.title)}</b>${x.feat?`<div class="d">feat. ${esc(x.feat)}</div>`:''}</div><span class="d">${fmt(x.dur)}</span>
 <span style="display:flex">${L&&t.allowDl?`<button class="ib" data-ring="${t.id}:${j}" title="Make ringtone">${ic('ring')}</button>${dls?`<button class="ib" data-dl="${t.id}:${j}" title="Download">${ic('dl')}</button>`:''}`:''}</span></div>`).join('')}</div>
 ${L&&!mine(t)?promo():''}${L?`<h2>Comments <span class="d" style="font-weight:500">${cms.length}</span></h2>${me?`<form class="panel" id="cform" style="padding:10px"><div class="row"><input type="text" id="ctext" placeholder="Say something about this tape" required maxlength="400" style="flex:1;min-width:0;background:none"><button class="btn">Post</button></div></form>`:''}
 ${cms.map(c=>`<div class="cm"><b data-uname="${esc(c.by)}">Listener</b>${plusChip(c.by)}<span class="ts">${ago(c.ts)}</span>${me&&(c.by===me||canEditAll)?` <button class="ib" style="display:inline-grid;vertical-align:middle" data-delc="${c.id}" title="Delete comment">${ic('x')}</button>`:''}${me&&c.by!==me?` <button class="lnk rpt" data-report="comment:${c.id}">Report</button> <button class="lnk rpt" data-block="${c.by}">Block</button>`:''}<div>${esc(c.text)}</div></div>`).join('')}`:''}</div></div>`},
upload(){if(!me)return`<div class="empty"><b>Sign in to drop a tape.</b><br><a href="#account" style="color:var(--acc)">Sign in or create a free Artist account</a>.</div>`;
 if(!isArtist())return`<div class="panel" style="max-width:520px"><div class="kick">Artists only</div><h2 style="margin:6px 0">Switch to an Artist account</h2><p class="sub">Fan accounts stream, download and rate. Artist accounts can also upload tapes and see listener analytics. You can switch back any time.</p><button class="btn" data-role="artist" style="margin-top:12px">${ic('crown')} Become an artist</button></div>`;
 if(!assets)return'<div class="empty"><b>Uploads are unavailable.</b><br>Sign in again, then reload.</div>';
 return `<div class="kick">Release</div><h1>Drop a release</h1><p class="sub">Albums, EPs, singles and mixtapes, plus music videos. Free, and no label needed. Schedule it, credit your DJ and watch it climb. Max 50 MB per file.</p>
 <form id="up" class="two" style="margin-top:18px"><div class="panel"><label>Release type</label><div class="chips" id="f_fmt">${FORMATS.map(f=>`<label class="chip"><input type="radio" name="format" value="${f}" ${f==='Mixtape'?'checked':''} hidden>${f}</label>`).join('')}</div><label for="f_title">Title *</label><input type="text" id="f_title" name="title" required maxlength="80"><label for="f_artist">Artist name *</label><input type="text" id="f_artist" name="artist" required maxlength="60" value="${esc(LS.get('st_artist',myName))}">
 <label for="f_host">Hosted by (DJ or host)</label><input type="text" id="f_host" name="host" maxlength="60" list="djlist" autocomplete="off"><datalist id="djlist">${djList().map(d=>`<option value="${esc(d.name)}">`).join('')}</datalist><div class="two"><div><label for="f_genre">Genre</label><select id="f_genre" name="genre">${GENRES.map(g=>`<option>${g}</option>`).join('')}</select></div>
 <div><label for="f_rel">Release time (blank = now)</label><input type="datetime-local" id="f_rel" name="release"></div></div><label for="f_desc">Description</label><textarea id="f_desc" name="desc" rows="3" maxlength="600"></textarea>
 <div class="row" style="margin-top:14px"><label style="margin:0"><input type="checkbox" id="f_exp" name="explicit" checked> Explicit</label><label style="margin:0"><input type="checkbox" id="f_dl" name="allowDl" checked> Allow downloads &amp; ringtones</label></div>
 <div class="two"><div><label for="f_price">Download price (optional)</label><input type="text" id="f_price" name="price" inputmode="decimal" placeholder="Free, or e.g. 4.99"></div><div><label style="margin-top:28px"><input type="checkbox" id="f_mem" name="members" ${prof(me).member_price&&payReady(me)?'':'disabled'}> Members only</label></div></div>
 <p class="sub" style="font-size:13px">${payReady(me)?'Streaming stays free. A price only applies to downloads: you keep 85%, or 92% with Artist Pro.':`Set up payouts in <a href="#earn" style="color:var(--acc)">Earn</a> to sell downloads or make members-only tapes.`}</p></div>
 <div class="panel"><label>Cover art (square works best)</label><div class="dz" id="dzC" tabindex="0"><img id="cprev" alt="" style="max-width:160px;border-radius:14px" hidden>${ic('up2')}<span>Click or drop an image</span></div><input type="file" id="fC" accept="image/png,image/jpeg,image/webp,image/gif" hidden>
 <label>Countdown background (optional, wide image)</label><div class="dz" id="dzT" tabindex="0"><img id="tprev" alt="" style="max-width:100%;border-radius:12px" hidden>${ic('up2')}<span>Shown behind the countdown before release. Leave empty to use your cover.</span></div><input type="file" id="fT" accept="image/png,image/jpeg,image/webp" hidden>
 <label>Tracks * (mp3, m4a, wav…)</label><div class="dz" id="dzA" tabindex="0">${ic('plus')}<span>Click or drop audio files</span></div><input type="file" id="fA" accept="audio/*" multiple hidden><div class="list up" id="ulist" hidden></div>
 <label>Music videos (optional · MP4 or WebM, up to 50 MB each)</label><div class="dz" id="dzV" tabindex="0">${ic('play')}<span>Click or drop video files</span></div><input type="file" id="fV" accept="video/mp4,video/webm,video/quicktime" multiple hidden><div class="list up" id="vlist" hidden></div>
 <label for="f_yt">YouTube links (optional · one per line)</label><textarea id="f_yt" name="yt" rows="2" placeholder="https://youtu.be/..."></textarea>
 <button class="btn" style="width:100%;justify-content:center;margin-top:18px" id="upBtn">Release</button></div></form>`},
account(){if(!Backend.configured)return'<div class="empty"><b>Not connected.</b><br>Add your Supabase URL and key to config.js.</div>';
 if(me){const roleName={fan:'Fan',artist:'Artist',admin:'Admin'}[myRole]||'Fan';return `<div class="kick">Account · ${roleName}</div><h1>${esc(myName||'Your account')} ${proChip(me)}</h1>${atName(me)}<p class="sub">Signed in as ${esc(user.email())}</p>${profEdit()}<div class="panel" style="max-width:520px;margin-top:14px">${isPlus()?`<b>${ic('crown')} Plus member</b><div class="sub">Unlimited downloads, no promos · renews or ends ${new Date(plusUntil(me)).toLocaleDateString()}</div>${CFG.PLUS_MANAGE_LINK&&canBuy()?`<a class="btn ghost" style="margin-top:10px" href="${esc(CFG.PLUS_MANAGE_LINK)}" target="_blank" rel="noopener">Manage subscription</a>`:''}`:`<b>Free account</b><div class="sub">4 free downloads a week. Plus removes the limit.</div><a class="btn" style="margin-top:10px" href="#plus">${ic('crown')} See Plus</a>`}</div>
  <div class="row" style="margin-top:16px"><a class="btn ghost" href="#library">${ic('lib')} Your library</a><a class="btn ghost" href="#earn">${ic('bolt')} Earn</a>${isArtist()?`<a class="btn ghost" href="#write">${ic('news')} Write a story</a>`:''}${isArtist()?`<a class="btn ghost" href="#stats">${ic('chart')} Analytics</a>`:''}${myRole==='admin'?`<a class="btn ghost" href="#hq">${ic('chart')} Creator HQ</a><a class="btn ghost" href="#admin">${ic('shield')} Admin</a>`:''}
  ${myRole==='fan'?`<button class="btn ghost" data-role="artist">${ic('crown')} Become an artist</button>`:myRole==='artist'?`<button class="btn ghost" data-role="fan">Switch to fan account</button>`:''}<button class="btn ghost" data-auth="out">Sign out</button></div><div id="secbox" class="panel sec" style="max-width:520px;margin-top:16px"></div>`}
 return `<div class="kick">Welcome</div><h1 id="a_h">Sign in to SovereignTapes</h1><p class="sub">Anyone can stream. A free account lets you download, save offline, rate, comment and follow. Artists also upload and get listener analytics.</p>
 <form id="authf" class="panel" style="max-width:460px;margin-top:18px"><div id="a_namew" hidden><label>I'm joining as</label><div class="chips"><button type="button" class="chip on" data-ar="fan">${ic('heart')} Fan</button><button type="button" class="chip" data-ar="artist">${ic('crown')} Artist</button></div>
 <label for="a_name">Display or artist name</label><input type="text" id="a_name" maxlength="40" autocomplete="nickname"></div>
 <label for="a_email" id="a_el">Email or @username</label><input type="text" id="a_email" autocomplete="username" autocapitalize="none" spellcheck="false" placeholder="you@email.com or @yourname" required>
 <label for="a_pw">Password</label><input type="password" id="a_pw" required minlength="6" autocomplete="current-password"><a href="#" id="a_forgot" class="lnk forgot">Forgot password?</a><a href="#" id="a_otp" class="lnk forgot" style="margin-top:4px">Sign in with an email code instead</a>
 <button class="btn" id="a_go" style="width:100%;justify-content:center;margin-top:18px">Sign in</button>
 <p class="sub" style="margin-top:14px;text-align:center"><span id="a_q">New here?</span> <a href="#account" id="a_sw" style="color:var(--acc)">Create a free account</a></p></form>`},
stats(){if(!me||!isArtist())return'<div class="empty">Analytics are for Artist accounts.</div>';const my=S.tapes.filter(t=>t.by===me||myRole==='admin');
 const sum=k=>my.reduce((a,t)=>a+st(t)[k],0);
 return `<div class="kick">Analytics</div><h1>Your listeners</h1><p class="sub">Streams, downloads and where people listen, for the last 90 days. Regions come from each listener's time zone, so they're approximate.</p>
 <div class="stats" style="margin-top:14px"><div><b>${num(sum('plays'))}</b>streams</div><div><b>${num(sum('downloads'))}</b>downloads</div><div><b>${num(sum('likes'))}</b>likes</div><div><b>${num(sum('comments'))}</b>comments</div><div><b>${num(my.reduce((a,t)=>a+followers(t.artist),0))}</b>followers</div></div>
 <div id="anx"><div class="empty">Loading listener data…</div></div>
 <h2>By tape</h2><div class="list chart">${my.map(t=>`<div class="tr" data-go="#tape-${t.id}"><span class="n">${badge(t)?ic('starf'):''}</span><img decoding="async" loading="lazy" src="${coverURL(t)}" alt=""><div style="min-width:0"><b>${esc(t.title)}</b><div class="d">${live(t)?'Released '+ago(t.release):'Drops '+new Date(t.release).toLocaleDateString()}${sponsoredUntil(t)?' · Sponsored':''} · ${stars(rating(t))}</div></div><span class="d" style="text-align:right">${num(st(t).plays)} streams<br>${num(st(t).downloads)} downloads</span></div>`).join('')||'<div class="empty">No tapes yet.</div>'}</div>`},
hq(){if(myRole!=='admin')return'<div class="empty">Creator HQ is for the owner and admins.</div>';
 return `<div class="kick">Creator HQ · owner &amp; admins only</div><h1>Platform dashboard</h1><div class="row" style="margin:4px 0 6px"><button class="btn ghost" data-hqr>${ic('clock')} Refresh</button><a class="btn ghost" href="#admin">${ic('shield')} Admin tools</a></div><div id="hqt"></div><div id="adx"><div class="empty">Loading the numbers…</div></div>`},
admin(){if(myRole!=='admin')return'<div class="empty">Admins only.</div>';const T=id=>S.tapes.find(t=>t.id===id);
 const act=S.sponsors.filter(s=>+s.until>Date.now()),req=S.sponsor_requests.slice().sort((a,b)=>a.ts-b.ts);
 return `<div class="kick">Admin · only you and your admins see this</div><h1>Admin tools</h1><a class="promo" href="#hq" style="display:flex;margin-top:6px"><div><div class="kick">Creator HQ</div><b>Platform revenue, growth and metrics</b><span class="sub">Its own dashboard, for you and your admins</span></div><span class="btn">${ic('chart')} Open</span></a><div class="panel" id="secadm" style="margin-top:16px"></div>${giftPanel()}<h1 style="margin-top:34px">Sponsorships</h1><h2>Requests <span class="d" style="font-weight:500">${req.length}</span></h2><div class="list">${req.map(r=>`<div class="tr" style="grid-template-columns:minmax(0,1fr) auto;cursor:default"><div style="min-width:0"><b>${esc(r.title)}</b> <span class="d">· ${esc(r.artist)}</span><div class="d">${r.days} days · ${esc(r.price)} · requested ${ago(r.ts)}${T(r.tape)?'':' · tape deleted'}</div></div>
 <span class="row"><button class="btn" data-approve="${r.id}">Approve</button><button class="btn ghost" data-decline="${r.id}">Decline</button></span></div>`).join('')||'<div class="empty">No pending requests.</div>'}</div>
 <h2>Active sponsorships</h2><div class="list">${act.map(s=>`<div class="tr" style="grid-template-columns:minmax(0,1fr) auto;cursor:default"><div><b>${esc(T(s.id)?.title||s.id)}</b><div class="d">until ${new Date(+s.until).toLocaleDateString()}</div></div><button class="btn ghost" data-unsp="${s.id}">End now</button></div>`).join('')||'<div class="empty">None active.</div>'}</div>
 <h2>Plus revenue share</h2><div class="panel" style="max-width:560px"><p class="sub">Pays artists half of last month's Plus revenue, split by streams + downloads. Run it once at the start of each month; running it twice never pays twice.</p><button class="btn" id="plusShare" style="margin-top:10px">${ic('bolt')} Pay last month's Plus share</button></div>
 <p class="sub" style="font-size:13px;margin-top:16px">Your platform fees from tips, sales, memberships and DJ bookings, plus Artist Pro and boosts, arrive in your Stripe balance automatically. Check payment in your Stripe dashboard before approving. To remove any tape or comment, open it while signed in as admin and use Delete.</p>`}};

V.earn=()=>{if(!me)return`<div class="empty">${signinLink('to earn on SovereignTapes.')}</div>`;const p=prof(me),ready=payReady(me),pro=proUntil(me);
 const mine=S.earnings.filter(e=>e.who===me).sort((a,b)=>b.ts-a.ts),sum=k=>mine.filter(e=>!k||e.kind===k).reduce((a,e)=>a+(+e.net||0),0);
 const books=S.bookings.filter(b=>b.dj===me||b.artist===me).sort((a,b)=>b.ts-a.ts),KIND={tip:'Tip',sale:'Download sale',membership:'Membership',hosting:'DJ hosting',plus:'Plus share'};
 return `<div class="kick">Earn</div><h1>Get paid on SovereignTapes</h1><p class="sub">Tips, download sales, fan memberships, DJ hosting and a monthly share of Plus. Streaming stays free for fans.</p>
 <div class="two" style="margin-top:16px"><div class="panel"><div class="kick">Payouts</div>${ready?`<b>${ic('check')} Payouts are on</b><p class="sub">Stripe sends your money straight to your bank.</p><button class="btn ghost" id="payDash" style="margin-top:10px">Open payouts dashboard</button>`
  :`<b>Set up payouts</b><p class="sub">Link your bank through Stripe (about 5 minutes). Until then fans can't pay you.</p>${canBuy()?`<button class="btn" id="payConnect" style="margin-top:10px">${ic('bolt')} Set up payouts</button>`:'<p class="sub">Open SovereignTapes on the website to set this up.</p>'}`}</div>
 <div class="panel"><div class="kick">Artist Pro · ${esc(CFG.PRO_PRICE||'$9.99/month')}</div>${pro?`<b>${ic('check')} Verified until ${new Date(pro).toLocaleDateString()}</b>`:`<b>Keep more of every sale</b>`}<ul class="sub" style="margin:8px 0 0;padding-left:18px"><li>Verified badge on your pages</li><li>Platform fee 8% instead of 15% (tips 5% instead of 10%)</li><li>First in line for World Premiere slots</li></ul>${pro?'':`<button class="btn" data-pro style="margin-top:10px">${ic('crown')} Go Pro</button>`}</div></div>
 <h2>Your earnings</h2><div class="stats"><div><b>${money(sum())}</b>total</div><div><b>${money(sum('tip'))}</b>tips</div><div><b>${money(sum('sale'))}</b>sales</div><div><b>${money(sum('membership'))}</b>memberships</div><div><b>${money(sum('hosting'))}</b>hosting</div><div><b>${money(sum('plus'))}</b>Plus share</div></div>
 <div class="list">${mine.slice(0,30).map(e=>`<div class="tr" style="grid-template-columns:minmax(0,1fr) auto;cursor:default"><div><b>${e.split?`Split sale · your ${e.split}%`:KIND[e.kind]||e.kind}</b><div class="d">${ago(e.ts)}${e.note&&e.kind==='plus'?' · '+esc(e.note):''}</div></div><span class="d" style="text-align:right"><b style="color:var(--text)">${money(+e.net||0)}</b><br>${money(+e.fee||0)} fee</span></div>`).join('')||'<div class="empty">No earnings yet.</div>'}</div>
 <form id="earnf" class="two" style="margin-top:22px"><div class="panel"><div class="kick">Fan memberships</div><p class="sub">Fans pay you monthly. Mark tapes "Members only" when you upload them.</p><label for="e_mp">Monthly price (USD, blank = off)</label><input type="text" id="e_mp" inputmode="decimal" value="${p.member_price?(p.member_price/100).toFixed(2):''}" placeholder="e.g. 3.00">
  <label for="e_perks">What members get</label><textarea id="e_perks" rows="2" maxlength="200" placeholder="Early drops, members-only tracks, shout-outs">${esc(p.member_perks||'')}</textarea></div>
 <div class="panel"><div class="kick">DJ hosting</div><p class="sub">Artists book you to host their tape. Your DJ page shows a booking button.</p><label for="e_dj">DJ name (as artists credit you)</label><input type="text" id="e_dj" maxlength="60" value="${esc(p.dj_name||'')}">
  <label for="e_hp">Price per tape (USD)</label><input type="text" id="e_hp" inputmode="decimal" value="${p.host_price?(p.host_price/100).toFixed(2):''}" placeholder="e.g. 50"><label for="e_bio">Short bio</label><input type="text" id="e_bio" maxlength="160" value="${esc(p.dj_bio||'')}">
  <label style="margin-top:10px"><input type="checkbox" id="e_open" ${p.host_open?'checked':''}> Taking bookings</label></div>
 <div class="panel"><div class="kick">Live bookings</div><p class="sub">Fans and promoters book you for shows, parties and events. You get a request, send a price, and they pay through SovereignTapes.</p>
  <label style="margin-top:6px"><input type="checkbox" id="e_bo" ${p.book_open?'checked':''}> Open for bookings</label><label for="e_bp">Starting price (USD)</label><input type="text" id="e_bp" inputmode="decimal" value="${p.book_price?(p.book_price/100).toFixed(2):''}" placeholder="e.g. 500">
  <label for="e_bi">What's included</label><input type="text" id="e_bi" maxlength="160" value="${esc(p.book_info||'')}" placeholder="45-minute set, travel within 50 miles"></div>
 <button class="btn" style="justify-content:center">Save</button></form>
 <h2>Where fans want you</h2><p class="sub">Cities where fans tapped "I'd go" on your page. Book where the demand is.</p><div class="panel" data-heat="${me}"><p class="sub">Loading…</p></div>
 <h2>Your show dates</h2>${showList(me,true)}<form id="showf" class="panel two" style="margin-top:10px"><div><label for="sh_d">Date and time</label><input type="datetime-local" id="sh_d" required><label for="sh_v">Venue or event</label><input type="text" id="sh_v" maxlength="80" required></div>
 <div><label for="sh_c">City</label><input type="text" id="sh_c" maxlength="60" required><label for="sh_t">Ticket link (optional)</label><input type="url" id="sh_t" placeholder="https://"><button class="btn" style="margin-top:12px">Add show</button></div></form>
 ${books.length?`<h2>DJ bookings</h2><div class="list">${books.map(b=>`<div class="tr" style="grid-template-columns:minmax(0,1fr) auto;cursor:default"><div><b>${b.dj===me?'Booked by '+esc(prof(b.artist).name||'an artist'):'You booked '+esc(prof(b.dj).dj_name||'a DJ')}</b><div class="d">${money(+b.amount||0)} · ${ago(b.ts)} · ${b.status==='done'?'Delivered':'Paid'}${b.note?' · '+esc(b.note):''}</div></div>${b.dj===me&&b.status!=='done'?`<button class="btn ghost" data-deliv="${b.id}">Mark delivered</button>`:''}</div>`).join('')}</div>`:''}`};
V.plus=()=>{const price=esc(CFG.PLUS_PRICE||'$4.99/month'),perks=[['dl','Unlimited downloads','No weekly limit on MP3s, ZIPs and ringtones.'],['phone','Build a bigger offline library','Save every tape you want to your phone or computer.'],['x','No promo banners','A cleaner app, start to finish.'],['crown','Plus badge','Shows next to your name in comments.'],['heart','Pays independent artists','Half of every Plus subscription is shared with artists each month, by streams and downloads.']];
 const cta=isPlus()?`<div class="note">${ic('check')} You're a Plus member until ${new Date(plusUntil(me)).toLocaleDateString()}.</div>`:!me?`<a class="btn" href="#account">Sign in to get Plus</a>`
  :CFG.PLUS_PAYMENT_LINK&&canBuy()?`<a class="btn" href="${esc(CFG.PLUS_PAYMENT_LINK)}?client_reference_id=plus_${me}&prefilled_email=${encodeURIComponent(user.email())}" target="_blank" rel="noopener">${ic('crown')} Get Plus · ${price}</a><p class="sub" style="font-size:13px;margin-top:10px">Secure checkout by Stripe. Plus turns on automatically within a minute. Cancel any time.</p>`
  :`<div class="note">Plus is available on the SovereignTapes website${CFG.SHARE_URL?': '+esc(CFG.SHARE_URL.replace(/^https?:\/\//,'')):''}. Your membership works here too once you sign in.</div>`;
 return `<section class="hero plushero"><div><div class="kick">SovereignTapes Plus</div><h1>Download everything.<br>No limits.</h1><p class="sub">${price}. Streaming stays free for everyone.</p><div style="margin-top:16px">${cta}</div></div></section>
 <div class="perks">${perks.map(([i,h,p])=>`<div class="panel">${ic(i)}<b>${h}</b><span class="sub">${p}</span></div>`).join('')}</div>`};
const adSlot=()=>CFG.ADSENSE_CLIENT&&CFG.ADSENSE_SLOT&&!isPlus()&&!Backend.isNative()?`<ins class="adsbygoogle" style="display:block;margin:18px 0" data-ad-client="${esc(CFG.ADSENSE_CLIENT)}" data-ad-slot="${esc(CFG.ADSENSE_SLOT)}" data-ad-format="auto" data-full-width-responsive="true"></ins>`:'';
function fillAds(){if(!$('ins.adsbygoogle:not([data-adsbygoogle-status])'))return;if(!window._adsjs){window._adsjs=1;const sc=document.createElement('script');sc.async=true;sc.crossOrigin='anonymous';sc.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(CFG.ADSENSE_CLIENT);document.head.appendChild(sc)}
 $$('ins.adsbygoogle:not([data-adsbygoogle-status])').forEach(()=>{try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch{}})}
function ticker(){const l=trending().slice(0,12);if(!l.length)return'';const items=l.map((t,i)=>`<a href="#tape-${t.id}"><b>#${i+1}</b>${esc(t.title)}<span>${esc(t.artist)} · ${num(total(t))} plays</span></a>`).join('<i aria-hidden="true">✦</i>');
 return `<div class="ticker" role="marquee" aria-label="Trending now"><span class="tk-l">${ic('bolt')} Trending</span><div class="tk"><div class="tk-in" style="--n:${l.length}">${items}<i aria-hidden="true">✦</i>${items}<i aria-hidden="true">✦</i></div></div></div>`}
function promo(){if(isPlus()||status==='offline')return'';if(adSlot())return adSlot();const mineLive=S.tapes.filter(t=>me&&t.by===me&&live(t)&&!sponsoredUntil(t)).sort((a,b)=>total(b)-total(a));
 if(isArtist()&&mineLive.length)return`<div class="promo"><div><div class="kick">For artists</div><b>Put “${esc(mineLive[0].title)}” on the front page</b><span class="sub">Sponsored tapes are featured on Home and free for every fan to download.</span></div><button class="btn" data-promo="${mineLive[0].id}">${ic('bolt')} Promote</button></div>`;
 return`<div class="promo"><div><div class="kick">SovereignTapes Plus</div><b>Unlimited downloads, no banners</b><span class="sub">${esc(CFG.PLUS_PRICE||'$4.99/month')} · cancel any time</span></div><a class="btn" href="#plus">${ic('crown')} Go Plus</a></div>`}
async function loadAnalytics(){const box=$('#anx');if(!box)return;try{const rows=await db.rpc('artist_analytics');const reg={},day={};
  for(const r of rows){if(r.kind==='play'){reg[r.region]=(reg[r.region]||0)+ +r.n;day[r.day]=(day[r.day]||0)+ +r.n}}
  const top=Object.entries(reg).sort((a,b)=>b[1]-a[1]).slice(0,10),mx=top[0]?.[1]||1,days=[...Array(30)].map((_,i)=>{const d=new Date(Date.now()-(29-i)*864e5).toISOString().slice(0,10);return[d,day[d]||0]}),dm=Math.max(1,...days.map(d=>d[1]));
  if(!$('#anx'))return;box.innerHTML=`<div class="two" style="margin-top:20px"><div class="panel"><div class="kick">Streams, last 30 days</div><div class="spark">${days.map(([d,n])=>`<i style="height:${Math.max(2,n/dm*100)}%" title="${d}: ${n}"></i>`).join('')}</div><div class="d" style="display:flex;justify-content:space-between"><span>${days[0][0].slice(5)}</span><span>today</span></div></div>
  <div class="panel"><div class="kick">Top listener regions</div>${top.length?top.map(([r,n])=>`<div class="hb"><span>${esc(place(r))}</span><i style="width:${n/mx*100}%"></i><b>${num(n)}</b></div>`).join(''):'<p class="sub">No streams yet.</p>'}</div></div>`}
 catch(e){box.innerHTML=`<div class="note">Listener data is unavailable right now (${esc(e.message)}).</div>`}}

// ---------- router ----------
let refreshedPay=0,upFiles=[],upCover=null,upTake=null,cdTimer,view='';
function setTakeover(h,base){const el=$('#takeover');let t=null;if(base==='tape'){t=S.tapes.find(x=>x.id===h.slice(5));if(t&&live(t)&&!justDropped(t))t=null}else if(!h&&status!=='loading')t=nextDrop();
 if(!t){el.classList.remove('on');return}const custom=okPath(t.takeoverId);el.style.backgroundImage=`url("${custom?Backend.url(t.takeoverId):coverURL(t)}")`;el.classList.toggle('blur',!custom);el.classList.add('on')}
// ---------- editorials: stories artists publish about themselves and their releases ----------
const stories=()=>S.editorials.filter(x=>!isBlocked(x.by)&&x.title&&x.body&&(+x.ts||0)<=Date.now()).sort((a,b)=>b.ts-a.ts);
const storyCover=x=>okPath(x.coverId)?Backend.url(x.coverId):(S.tapes.find(t=>t.id===x.tape)?coverURL(S.tapes.find(t=>t.id===x.tape)):'');
const readMins=x=>Math.max(1,Math.round(String(x.body).split(/\s+/).length/220));
const storyBody=b=>String(b).replace(/\r/g,'').split(/\n{2,}/).map(p=>p.trim()).filter(Boolean).flatMap(p=>p.startsWith('## ')&&p.includes('\n')?[p.slice(0,p.indexOf('\n')),p.slice(p.indexOf('\n')+1).trim()]:[p]).map(p=>p.startsWith('## ')?`<h3>${esc(p.slice(3))}</h3>`:p.startsWith('> ')?`<blockquote>${esc(p.slice(2))}</blockquote>`:`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');
const storyCard=x=>{const c=storyCover(x);return`<a class="story" href="#story-${x.id}">${c?`<img decoding="async" loading="lazy" src="${c}" alt="">`:'<span class="sph"></span>'}<div><div class="kick">${esc(pName(x.by))}${x.tape&&S.tapes.find(t=>t.id===x.tape)?' · '+esc(S.tapes.find(t=>t.id===x.tape).title):''}</div><b>${esc(x.title)}</b>${x.dek?`<span class="sub">${esc(x.dek)}</span>`:''}<span class="d">${ago(x.ts)} · ${readMins(x)} min read</span></div></a>`};
const storyList=(l,empty)=>l.length?`<div class="stories">${l.map(storyCard).join('')}</div>`:`<div class="empty">${empty}</div>`;
V.news=()=>`<div class="kick">Editorials</div><h1>Stories from the artists</h1><p class="sub">Interviews, the story behind the music, and what's dropping next, straight from the artists and DJs.</p>
 ${isArtist()?`<a class="btn" href="#write" style="margin:12px 0">${ic('plus')} Write a story</a>`:''}${storyList(stories(),'No stories yet. Artists can write one from their account.')}`;
V.story=id=>{const x=S.editorials.find(s=>s.id===id);if(!x)return status!=='ready'?'<div class="empty">Loading the story…</div>':'<div class="empty">This story was removed or the link is wrong.</div>';
 const t=S.tapes.find(y=>y.id===x.tape),c=storyCover(x),own=x.by===me;
 return`<article class="article">${c?`<img class="ahero" src="${c}" alt="">`:''}<div class="kick">Editorial${t?' · '+fmtOf(t):''}</div><h1>${esc(x.title)}</h1>${x.dek?`<p class="dek">${esc(x.dek)}</p>`:''}
 <div class="byline">${avatarImg(x.by)||''}<div><a href="${pHref(x.by)}"><b>${esc(pName(x.by))}</b></a> ${proChip(x.by)}<div class="d">${new Date(x.ts).toLocaleDateString(undefined,{month:'long',day:'numeric',year:'numeric'})} · ${readMins(x)} min read</div></div></div>
 <div class="abody">${storyBody(x.body)}</div>
 ${t?`<div class="panel arel"><img src="${coverURL(t)}" alt=""><div><div class="kick">${fmtOf(t)} · ${live(t)?'Out now':'Drops '+new Date(t.release).toLocaleDateString()}</div><b>${esc(t.title)}</b><span class="d">${esc(t.artist)}</span></div><span class="row">${live(t)?`<button class="btn" data-play="${t.id}">${ic('play')} Play</button>`:''}<a class="btn ghost" href="#tape-${t.id}">Open</a></span></div>`:''}
 <div class="row" style="margin-top:18px"><button class="btn ghost" data-storyshare="${x.id}">Share story</button>${me&&!own?`<button class="btn ghost" data-report="story:${x.id}">Report</button>`:''}${own?`<a class="btn ghost" href="#edit-${x.id}">Edit</a><button class="btn ghost" data-storydel="${x.id}">${ic('trash')} Delete</button>`:myRole==='admin'?`<button class="btn ghost" data-storydel="${x.id}">${ic('trash')} Remove (admin)</button>`:''}</div></article>`};
const storyForm=x=>{const mine2=S.tapes.filter(t=>t.by===me).sort((a,b)=>b.release-a.release);
 return`<form id="storyf" class="panel" data-id="${x?.id||''}" style="max-width:760px;margin-top:14px">
 <label for="s_title">Headline *</label><input type="text" id="s_title" maxlength="120" required value="${esc(x?.title||'')}">
 <label for="s_dek">Subheading</label><input type="text" id="s_dek" maxlength="200" value="${esc(x?.dek||'')}" placeholder="One line that makes people want to read">
 <label for="s_tape">About which release?</label><select id="s_tape"><option value="">Just about me</option>${mine2.map(t=>`<option value="${t.id}" ${x?.tape===t.id?'selected':''}>${esc(t.title)} (${fmtOf(t)})</option>`).join('')}</select>
 <label for="s_cover">Header image (optional, otherwise the release cover)</label><input type="file" id="s_cover" accept="image/png,image/jpeg,image/webp">
 <label for="s_body">Story *</label><textarea id="s_body" rows="14" maxlength="20000" required placeholder="Leave a blank line between paragraphs. Start a line with ## for a heading, or > for a pull quote.">${esc(x?.body||'')}</textarea>
 <button class="btn" style="width:100%;justify-content:center;margin-top:16px">${x?'Save changes':'Publish story'}</button></form>`};
V.write=()=>!me?`<div class="empty">${signinLink('to write a story.')}</div>`:!isArtist()?'<div class="empty">Editorials are written by artists and DJs. Switch to an Artist account in Account.</div>':`<div class="kick">Editorials</div><h1>Write a story</h1><p class="sub">Tell fans the story behind you and your next release. It goes on your page, on the release and in Editorials.</p>${storyForm()}`;
V.edit=id=>{const x=S.editorials.find(s=>s.id===id);if(!x||x.by!==me)return'<div class="empty">You can only edit your own stories.</div>';return`<div class="kick">Editorials</div><h1>Edit story</h1>${storyForm(x)}`};
// artist and release pages list their stories
{const a0=V.artist,t0=V.tape;
 V.artist=k=>{const l=S.tapes.filter(t=>hkey(t.artist)===k),by=l[0]?.by;if(by&&isBlocked(by))return`<div class="empty">You blocked this artist. <button class="lnk" data-unblock="${by}" style="color:var(--acc)">Unblock</button></div>`;const h=a0(k)+(me&&by&&by!==me?`<p class="d" style="margin-top:14px;font-size:13px"><button class="lnk rpt" data-report="user:${by}">Report this artist</button> · <button class="lnk rpt" data-block="${by}">Block</button></p>`:''),s=by?stories().filter(x=>x.by===by):[];return s.length?h+`<h2>${ic('news')} Editorials</h2>${storyList(s,'')}`:h};
 V.tape=id=>{const t1=S.tapes.find(y=>y.id===id),rb=me&&t1&&!mine(t1)?`<p class="d" style="margin-top:14px;font-size:13px"><button class="lnk rpt" data-report="tape:${id}">Report this release</button> · <button class="lnk rpt" data-block="${t1.by}">Block this artist</button></p>`:'';const h=t0(id)+rb,s=stories().filter(x=>x.tape===id),t=S.tapes.find(y=>y.id===id);return h+(s.length?`<h2>${ic('news')} The story behind it</h2>${storyList(s,'')}`:'')+(t&&mine(t)&&live(t)?`<p style="margin-top:12px"><a class="btn ghost" href="#write" data-storyfor="${id}">${ic('news')} Write a story about this release</a></p>`:'')}}
let storyFor='';
document.addEventListener('click',e=>{const f=e.target.closest('[data-storyfor]');if(f)storyFor=f.dataset.storyfor;
 const sh=e.target.closest('[data-storyshare]');if(sh){const u=(CFG.SHARE_URL||location.origin)+'/#story-'+sh.dataset.storyshare,x=S.editorials.find(s=>s.id===sh.dataset.storyshare);
  if(navigator.share)navigator.share({title:x?.title||'SovereignTapes',url:u}).catch(()=>{});else navigator.clipboard?.writeText(u).then(()=>toast('Link copied'),()=>toast(u))}
 const dl=e.target.closest('[data-storydel]');if(dl){if(dl.dataset.armed!=='1'){dl.dataset.armed='1';dl.textContent='Tap again to delete';setTimeout(()=>{if(dl.isConnected){dl.dataset.armed='';dl.innerHTML=ic('trash')+' Delete'}},4000);return}
  db.collection('editorials').doc(dl.dataset.storydel).delete().then(()=>{toast('Story deleted');location.hash='news'},err=>toast('Could not delete: '+err.message))}});
document.addEventListener('submit',async e=>{if(e.target.id!=='storyf')return;e.preventDefault();if(!needMe()||!isArtist())return;const f=e.target,b=f.querySelector('button.btn');
 const title=$('#s_title').value.trim(),dek=$('#s_dek').value.trim(),body=$('#s_body').value.trim(),tape=$('#s_tape').value,file=$('#s_cover').files[0];
 if(title.length<4)return toast('Add a headline');if(body.length<80)return toast('Write a little more: at least a few sentences');
 if(tape&&!S.tapes.some(t=>t.id===tape&&t.by===me))return toast('Pick one of your own releases');
 if(file&&(!/^image\/(png|jpeg|webp)$/.test(file.type)||file.size>20e6))return toast('Header image must be a PNG, JPG or WebP under 20 MB');
 b.disabled=true;const old=f.dataset.id?S.editorials.find(s=>s.id===f.dataset.id):null;let up=null;
 try{if(file){b.textContent='Uploading image…';up=await assets.upload(file)}
  const data={by:me,title,dek,body,tape,coverId:up?up.id:(old?.coverId||null),ts:old?.ts||Date.now(),edited:old?Date.now():0};
  const ref=old?db.collection('editorials').doc(old.id):db.collection('editorials').doc();
  old?await ref.update(data):await ref.set(data);toast(old?'Story updated':'Story published');location.hash='story-'+(old?old.id:ref.id)}
 catch(err){if(up)assets.delete(up.id).catch(()=>{});toast('Could not publish: '+err.message);b.disabled=false;b.textContent=old?'Save changes':'Publish story'}});
// ---------- delete my account (Google Play requires it in the app and on the web) ----------
{const a0=V.account;V.account=()=>{const h=a0()+'<p class="d" style="margin-top:22px;font-size:13px"><a href="privacy.html" style="color:var(--acc)">Privacy policy</a></p>';if(!me||prof(me).owner)return h;
 return h+`<div class="panel danger" style="max-width:520px;margin-top:22px"><div class="kick">Delete account</div><p class="sub">This permanently deletes your account, profile, uploads, stories, likes, follows and comments. It can't be undone. If you pay for Plus, Artist Pro, a Verified badge or a membership, cancel it first with Manage subscription so you aren't charged again.</p>
 <form id="delacct" class="row" style="margin-top:10px"><input type="text" id="del_c" placeholder="Type DELETE to confirm" autocomplete="off" style="flex:1;min-width:0" required><button class="btn ghost">${ic('trash')} Delete my account</button></form></div>`}}
document.addEventListener('submit',async e=>{if(e.target.id!=='delacct')return;e.preventDefault();if(!needMe())return;
 if($('#del_c').value.trim()!=='DELETE')return toast('Type DELETE in capitals to confirm');const b=e.target.querySelector('button');b.disabled=true;b.textContent='Deleting…';
 // best effort: remove my files first (the database rows go with the account)
 const files=new Set(),add=v=>{if(typeof v==='string'&&(v.startsWith(me+'/')||v.startsWith('vault/'+me+'/')))files.add(v)};
 for(const t of S.tapes.filter(t=>t.by===me)){add(t.coverId);add(t.takeoverId);for(const x of t.tracks||[])add(x.asset);for(const v of t.videos||[])add(v.asset)}
 for(const x of S.editorials.filter(x=>x.by===me))add(x.coverId);for(const v of Object.values(prof(me)))add(v);
 for(const f of files)await assets?.delete(f).catch(()=>{});
 try{await db.rpc('delete_my_account');try{await Backend.signOut()}catch{}LS.set('st_rem',[]);toast('Your account was deleted');setTimeout(()=>{location.hash='';location.reload()},1500)}
 catch(err){toast(err.message||'Could not delete the account');b.disabled=false;b.innerHTML=ic('trash')+' Delete my account'}});
// ---------- report and block (Google Play user-content policy) ----------
const RREASONS=['Sexual content or nudity','Violence or threats','Hate speech or harassment','Spam or scam','Stolen or copyrighted music','Something else'];
document.addEventListener('click',async e=>{const r=e.target.closest('[data-report]'),b=e.target.closest('[data-block]'),u=e.target.closest('[data-unblock]'),dr=e.target.closest('[data-rdone]');
 if(r){if(!needMe())return;const [kind,target]=r.dataset.report.split(':');modal(`<h2 style="margin-top:0">Report</h2><p class="sub">Tell us what's wrong. Our team reviews every report.</p><form id="rptf" data-kind="${esc(kind)}" data-target="${esc(target)}">${RREASONS.map((x,i)=>`<label style="display:flex;gap:8px;align-items:center;margin:8px 0"><input type="radio" name="rr" value="${i}" ${i?'':'checked'}> ${x}</label>`).join('')}<textarea id="rr_d" rows="3" maxlength="500" placeholder="Anything else we should know? (optional)"></textarea><button class="btn" style="width:100%;justify-content:center;margin-top:12px">Send report</button></form>`)}
 else if(b){if(!needMe())return;if(b.dataset.armed!=='1'){b.dataset.armed='1';b.textContent='Tap again to block';setTimeout(()=>{if(b.isConnected){b.dataset.armed='';b.textContent='Block'}},4000);return}blocked.add(b.dataset.block);LS.set('st_blocked',[...blocked]);toast('Blocked. You won\'t see their releases, stories or comments.');route()}
 else if(u){blocked.delete(u.dataset.unblock);LS.set('st_blocked',[...blocked]);toast('Unblocked');route()}
 else if(dr&&myRole==='admin'){db.collection('reports').doc(dr.dataset.rdone).delete().then(()=>toast('Report cleared'),err=>toast(err.message))}});
document.addEventListener('submit',async e=>{if(e.target.id!=='rptf')return;e.preventDefault();const f=e.target,i=+(f.querySelector('input[name=rr]:checked')?.value||0);
 try{await db.collection('reports').doc().set({by:me,kind:f.dataset.kind,target:f.dataset.target,reason:RREASONS[i]||'Other',details:$('#rr_d').value.trim().slice(0,500),ts:Date.now()});closeModal();toast('Thanks. Your report was sent to our team.')}catch(err){toast('Could not send: '+err.message)}});
const rLink=r=>r.kind==='tape'?`#tape-${r.target}`:r.kind==='story'?`#story-${r.target}`:r.kind==='comment'?(S.comments.find(c=>c.id===r.target)?`#tape-${S.comments.find(c=>c.id===r.target).tape}`:''):pHref(r.target);
{const ad0=V.admin;V.admin=()=>{const h=ad0();if(myRole!=='admin')return h;const l=S.reports.slice().sort((a,b)=>b.ts-a.ts);
 return h+`<h1 style="margin-top:34px">Reports <span class="d" style="font-weight:500">${l.length}</span></h1><div class="list">${l.map(r=>`<div class="tr" style="grid-template-columns:minmax(0,1fr) auto;cursor:default"><div style="min-width:0"><b>${esc(r.reason)}</b> <span class="d">· ${esc(r.kind)} · ${ago(r.ts)}</span>${r.details?`<div class="d">${esc(r.details)}</div>`:''}${r.kind==='comment'&&S.comments.find(c=>c.id===r.target)?`<div class="d">"${esc(S.comments.find(c=>c.id===r.target).text.slice(0,140))}"</div>`:''}</div><span class="row">${rLink(r)?`<a class="btn ghost" href="${rLink(r)}">Open</a>`:''}${r.kind==='comment'&&S.comments.some(c=>c.id===r.target)?`<button class="btn ghost" data-delc="${esc(r.target)}">Delete comment</button>`:''}<button class="btn ghost" data-rdone="${r.id}">Clear</button></span></div>`).join('')||'<div class="empty">No reports. 🎉</div>'}</div>`}}
{const ac0=V.account;V.account=()=>{const h=ac0();if(!me||!blocked.size)return h;return h+`<div class="panel" style="max-width:520px;margin-top:18px"><div class="kick">Blocked</div>${[...blocked].map(id=>`<div class="row" style="justify-content:space-between;margin-top:8px"><span>${esc(pName(id))}</span><button class="btn ghost" data-unblock="${esc(id)}">Unblock</button></div>`).join('')}</div>`}}
function route(){const h=location.hash.slice(1);
 if(/^error=|&error_code=/.test(h)){const q=new URLSearchParams(h),c=q.get('error_code');toast(c==='otp_expired'?'That email link has expired or was already used. Sign in, or ask for a new link.':(q.get('error_description')||'That link did not work').replace(/\+/g,' '));history.replaceState(null,'','#account');return route()}
 view=h;const base=h.split('-')[0];
 $$('[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===(h.includes('-')?(base==='genre'?'explore':base==='dj'?'djs':'#'):h)));
 let html;if(status==='loading')html='<div class="skel" aria-label="Loading SovereignTapes"><i class="sk-h"></i><div class="sk-row">'+'<i class="sk-card"></i>'.repeat(6)+'</div><i class="sk-h"></i><div class="sk-row">'+'<i class="sk-card"></i>'.repeat(6)+'</div></div>';
 else if(status==='nodb')html='<div class="empty"><b>Not connected.</b><br>The app is missing its server settings. Add your Supabase URL and key to config.js.</div>';
 else{const note=status==='slow'?'<div class="note">Still reaching the server. What you see may be out of date.</div>':status==='offline'?`<div class="note">${ic('phone')} You're offline. Showing tapes saved on this device.</div>`:'',arg=h.slice(base.length+1);
  const R=['tape','artist','genre','dj','format','story','edit'];html=note+(R.includes(base)&&arg?V[base](arg):(V[h]&&!R.includes(h)?V[h]():V.home()))}
 navTrack();$('#app').innerHTML=backBtn(h)+html;markRows();fillAds();if(h==='earn'&&me&&!refreshedPay){refreshedPay=1;Backend.pay('status').then(r=>{if(r.ready&&!payReady(me))toast('Payouts are on. You can get paid now.')}).catch(()=>{})}clearInterval(cdTimer);fillNames();
 if($('[data-cd]'))cdTimer=setInterval(tickCd,1000);setTakeover(h,base);const dq=$('#djq');if(dq)dq.oninput=()=>{const q=dq.value.toLowerCase();$$('.djs .dj').forEach(e=>e.hidden=!e.textContent.toLowerCase().includes(q))};
 const q=$('#q');if(q){q.onkeydown=e=>{if(e.key==='Enter'){query=q.value.trim();route();$('#q')?.focus()}};q.oninput=()=>{if(!q.value&&query){query='';route();$('#q')?.focus()}}}
 if(h==='upload'&&me&&assets&&isArtist())initUpload();if(base==='tape')initComments(h.slice(5));if(h==='stats'&&db&&me)loadAnalytics();if(h==='hq'&&myRole==='admin')loadAdmin();if(h==='write'&&storyFor&&$('#s_tape')){$('#s_tape').value=storyFor;storyFor=''}const nh=$('#nav_hq');if(nh)nh.hidden=myRole!=='admin';fillDemand()}
let pend=0,dirty=false;const busy=()=>view==='upload'||document.activeElement?.closest?.('#app form,#app .sbox')||!$('#modal')?.hidden&&$('#modal');
function refresh(){counts();if(curTape){curTape=S.tapes.find(t=>t.id===curTape.id)||curTape;syncLike()}if(busy()||view==='stats'){dirty=true;return}if(pend)return;pend=requestAnimationFrame(()=>{pend=0;const y=scrollY;route();scrollTo(0,y)})}
document.addEventListener('focusout',()=>setTimeout(()=>{if(dirty&&!busy()&&view!=='stats'){dirty=false;refresh()}},50));
// page changes cross-fade (View Transitions) where the browser supports it and motion is welcome
const calmUI=matchMedia('(prefers-reduced-motion: reduce)').matches;
window.addEventListener('hashchange',()=>{closeModal();openNP(false);const go=()=>{route();scrollTo(0,0)};if(document.startViewTransition&&!calmUI){const vt=document.startViewTransition(go);for(const p of [vt.ready,vt.finished,vt.updateCallbackDone])p?.catch(()=>{})}else go()});
async function fillNames(){if(!user||!navigator.onLine)return;const els=[...$$('[data-uname]')];if(!els.length)return;
 try{const ps=await user.profiles([...new Set(els.map(e=>e.dataset.uname))]);els.forEach(e=>{e.textContent=(e.dataset.uname===me?'You':ps[e.dataset.uname]?.name)||'Listener';if(isVerified(e.dataset.uname))e.insertAdjacentHTML('beforeend',' '+ic('check','vb'))})}catch{}}

function initComments(id){const f=$('#cform');if(!f)return;f.onsubmit=async e=>{e.preventDefault();const text=$('#ctext').value.trim();if(!text)return;const b=f.querySelector('button');
 b.disabled=true;try{await db.collection('comments').doc().set({tape:id,by:me,text,ts:Date.now()});$('#ctext').value='';$('#ctext').blur()}catch(err){toast('Comment not posted: '+(err.message||err.code))}b.disabled=false}}
let upVids=[];
function drawVids(){const l=$('#vlist');if(!l)return;l.hidden=!upVids.length;l.innerHTML=upVids.map((v,i)=>`<div class="tr"><span class="n">${ic('play')}</span><input type="text" value="${esc(v.title)}" data-vi="${i}" placeholder="Video title" aria-label="Video ${i+1} title"><button type="button" class="ib" data-vdrop="${i}" title="Take this video out">${ic('x')}</button></div>`).join('');
 l.oninput=e=>{const i=e.target.dataset.vi;if(i!==undefined)upVids[i].title=e.target.value};l.onclick=e=>{const r=e.target.closest('[data-vdrop]');if(r){upVids.splice(+r.dataset.vdrop,1);drawVids()}}}
function initUpload(){upVids=[];upFiles=[];upCover=null;upTake=null;const zone=(dz,inp,fn)=>{dz.onclick=()=>inp.click();dz.onkeydown=e=>{if(e.key==='Enter')inp.click()};inp.onchange=()=>fn([...inp.files]);
 dz.ondragover=e=>{e.preventDefault();dz.classList.add('over')};dz.ondragleave=()=>dz.classList.remove('over');dz.ondrop=e=>{e.preventDefault();dz.classList.remove('over');fn([...e.dataTransfer.files])}};
 zone($('#dzC'),$('#fC'),f=>{const c=f.find(x=>/^image\/(png|jpeg|webp|gif)$/.test(x.type));if(!c)return toast('Use a PNG, JPG, WebP or GIF cover');if(c.size>20e6)return toast('Cover must be under 20 MB');upCover=c;const i=$('#cprev');i.src=URL.createObjectURL(c);i.hidden=false});
 zone($('#dzT'),$('#fT'),f=>{const c=f.find(x=>/^image\/(png|jpeg|webp)$/.test(x.type));if(!c)return toast('Use a PNG, JPG or WebP image');if(c.size>20e6)return toast('Image must be under 20 MB');upTake=c;const i=$('#tprev');i.src=URL.createObjectURL(c);i.hidden=false});
 zone($('#dzA'),$('#fA'),async f=>{for(const file of f.filter(x=>x.type.startsWith('audio/')||/\.(mp3|wav|m4a|aac|ogg|flac)$/i.test(x.name))){
  if(file.size>50*1024*1024){toast(file.name+' is over 50 MB. Export it as a 320 kbps MP3.');continue}
  const dur=await new Promise(r=>{const a=new Audio();a.preload='metadata';a.onloadedmetadata=()=>{r(a.duration);URL.revokeObjectURL(a.src)};a.onerror=()=>r(0);a.src=URL.createObjectURL(file)});
  upFiles.push({file,title:file.name.replace(/\.[^.]+$/,'').replace(/^\d+[\s.\-_]*/,''),feat:'',dur})}drawList()});
 zone($('#dzV'),$('#fV'),f=>{for(const file of f){if(!VIDOK.test(file.type)){toast(file.name+': use an MP4 or WebM video');continue}if(file.size>VMAX){toast(file.name+' is over 50 MB. Export it at 720p to make it smaller.');continue}upVids.push({file,title:file.name.replace(/\.[^.]+$/,'')})}drawVids()});
 const fmtc=()=>$$('#f_fmt .chip').forEach(c=>c.classList.toggle('on',c.querySelector('input').checked));$('#f_fmt').onchange=fmtc;fmtc();
 $('#up').onsubmit=submitUpload}
function drawList(){const l=$('#ulist');l.hidden=!upFiles.length;l.innerHTML=upFiles.map((f,i)=>`<div class="tr"><span class="n">${i+1}</span><input type="text" id="ut${i}" value="${esc(f.title)}" data-i="${i}" data-k="title" placeholder="Track title" aria-label="Track ${i+1} title"><input type="text" id="uf${i}" value="${esc(f.feat)}" data-i="${i}" data-k="feat" placeholder="feat." aria-label="Track ${i+1} featured artist"><span style="display:flex"><button type="button" class="ib" data-mv="${i}:-1" title="Move up">${ic('up')}</button><button type="button" class="ib" data-mv="${i}:1" title="Move down">${ic('down')}</button><button type="button" class="ib" data-rm="${i}" title="Remove">${ic('x')}</button></span></div>`).join('');
 l.oninput=e=>{const d=e.target.dataset;if(d.k)upFiles[d.i][d.k]=e.target.value}}
async function submitUpload(e){e.preventDefault();const fd=new FormData(e.target);if(!upFiles.length)return toast('Add at least one track');const badYt=String(fd.get('yt')||'').split(/\s+/).filter(Boolean).find(l=>!ytId(l));if(badYt)return toast('This is not a YouTube video link: '+badYt.slice(0,60));const pc=toCents(fd.get('price')||'');if(pc&&(pc<100||pc>10000))return toast('Download price must be $1 to $100, or leave it blank for free');const b=$('#upBtn');b.disabled=true;const uploaded=[];
 try{const tracks=[];let coverId=null;
  if(upCover){b.textContent='Uploading cover…';const r=await assets.upload(upCover);coverId=r.id;uploaded.push(r.id)}
  let takeoverId=null;if(upTake){b.textContent='Uploading background…';const r=await assets.upload(upTake);takeoverId=r.id;uploaded.push(r.id)}
  for(const [i,f] of upFiles.entries()){b.textContent=`Uploading track ${i+1} of ${upFiles.length}…`;const r=fd.get('members')?await assets.uploadVault(f.file):await assets.upload(f.file);uploaded.push(r.id);
   tracks.push({title:f.title.trim()||'Untitled',feat:f.feat.trim(),dur:Math.round(f.dur||0),asset:r.id})}
  const videos=[];for(const [i,v] of upVids.entries()){b.textContent=`Uploading video ${i+1} of ${upVids.length}…`;const r=await assets.upload(v.file);uploaded.push(r.id);videos.push({title:v.title.trim().slice(0,80)||'Music video',asset:r.id})}
  const format=FORMATS.includes(fd.get('format'))?fd.get('format'):'Mixtape';
  for(const line of String(fd.get('yt')||'').split(/\s+/).filter(Boolean)){const id=ytId(line);if(id&&!videos.some(v=>v.yt===id))videos.push({title:fd.get('title').trim().slice(0,80)||'Music video',yt:id})}
  const title=fd.get('title').trim(),artist=fd.get('artist').trim(),rel=fd.get('release')?new Date(fd.get('release')).getTime():Date.now();LS.set('st_artist',artist);
  const ref=db.collection('tapes').doc();
  await ref.set({format,videos,title,artist,by:me,host:fd.get('host').trim(),genre:fd.get('genre'),desc:fd.get('desc').trim(),coverId,takeoverId,hue:[Math.floor(Math.random()*360),Math.floor(Math.random()*360)],tracks,release:rel,created:Date.now(),explicit:!!fd.get('explicit'),allowDl:!!fd.get('allowDl'),price:payReady(me)?Math.min(10000,toCents(fd.get('price')||'')):0,members:!!fd.get('members')});
  toast(rel>Date.now()?'Scheduled. The countdown is live.':`Your ${format.toLowerCase()} is live.`);justMade=ref.id;view='';location.hash='tape-'+ref.id}
 catch(err){for(const id of uploaded)assets.delete(id).catch(()=>{});
  const code=err?.code;toast(code==='too_large'?'A file is too big. Keep tracks under 50 MB.':'Upload failed: '+(err?.message||code||'unknown error'));
  b.disabled=false;b.textContent='Release'}}

document.addEventListener('click',e=>{const b=e.target.closest('[data-addvid]');if(!b)return;const t=S.tapes.find(x=>x.id===b.dataset.addvid);if(!t||!mine(t)||!assets)return;
 const inp=document.createElement('input');inp.type='file';inp.accept='video/mp4,video/webm,video/quicktime';inp.onchange=async()=>{const f=inp.files[0];if(!f)return;if(!VIDOK.test(f.type))return toast('Use an MP4 or WebM video');if(f.size>VMAX)return toast('Video is over 50 MB. Export it at 720p to make it smaller.');
  b.disabled=true;b.textContent='Uploading video…';let r;try{r=await assets.upload(f);const{id,...data}=t;await db.collection('tapes').doc(id).update({...data,videos:[...vids(t),{title:f.name.replace(/\.[^.]+$/,'').slice(0,80),asset:r.id}].slice(0,12)});toast('Music video added')}
  catch(err){if(r)assets.delete(r.id).catch(()=>{});toast('Upload failed: '+(err.message||'error'))}b.disabled=false;b.innerHTML=ic('plus')+' Add a music video'};inp.click()});
document.addEventListener('submit',async e=>{const f=e.target.closest('[data-ytadd]');if(!f)return;e.preventDefault();const t=S.tapes.find(x=>x.id===f.dataset.ytadd);if(!t||!mine(t))return;
 const id=ytId(f.yt.value);if(!id)return toast('That is not a YouTube video link. Copy the link from the Share button on YouTube.');if(vids(t).some(v=>v.yt===id))return toast('That video is already on this release');
 const b=f.querySelector('button');b.disabled=true;const{id:tid,...data}=t;try{await db.collection('tapes').doc(tid).update({...data,videos:[...vids(t),{title:t.title,yt:id}].slice(0,12)});toast('YouTube video added')}catch(err){toast('Could not save: '+err.message)}b.disabled=false});
// a YouTube player taking focus means it started: pause the music
window.addEventListener('blur',()=>{setTimeout(()=>{if(document.activeElement?.tagName==='IFRAME'&&!A.paused)A.pause()})});
document.addEventListener('play',e=>{if(e.target.tagName==='VIDEO'){if(!A.paused)A.pause();$$('video').forEach(v=>{if(v!==e.target)v.pause()})}},true);
// ---------- actions ----------
const needMe=()=>{if(!me){toast('Sign in to do that');location.hash='account';return false}return true};
async function toggleLike(id){if(!needMe())return;const t=S.tapes.find(x=>x.id===id),ref=db.collection('likes').doc(me+'_'+id);try{liked(t)?await ref.delete():await ref.set({tape:id,by:me,ts:Date.now()})}catch{toast('Could not save your like')}}
let armedDel=null;
document.addEventListener('click',async e=>{const el=e.target.closest('[data-close],[data-act],[data-play],[data-like],[data-follow],[data-share],[data-dl],[data-ring],[data-off],[data-zip],[data-mp3],[data-rate],[data-promo],[data-role],[data-approve],[data-decline],[data-unsp],[data-rem],[data-del],[data-delc],[data-mv],[data-rm],[data-hg],[data-sort],[data-ct],[data-cs],[data-ls],[data-prem],[data-hostq],[data-genre],[data-auth],[data-ar],#a_sw,.tr[data-j],.js-open,[data-go]');if(!el)return;
 const d=el.dataset,T=id=>S.tapes.find(t=>t.id===id);
 if(d.close!==undefined)closeModal();
 else if(d.act){e.stopPropagation();act(d.act)}
 else if(d.play){e.stopPropagation();playTape(T(d.play))}
 else if(d.like){el.disabled=true;await toggleLike(d.like);el.disabled=false}
 else if(d.follow){if(!needMe())return;const a=d.follow,ref=db.collection('follows').doc(me+'_'+hkey(a));el.disabled=true;try{if(following(a)){await ref.delete();toast('Unfollowed '+a)}else{await ref.set({artist:a,akey:hkey(a),by:me,ts:Date.now()});toast('Following '+a)}}catch{toast('Could not update follow')}el.disabled=false}
 else if(d.rem){reminders=reminders.includes(d.rem)?reminders.filter(x=>x!==d.rem):[...reminders,d.rem];LS.set('st_rem',reminders);toast(reminders.includes(d.rem)?'Reminder set':'Reminder removed');route()}
 else if(d.share){const u=(CFG.SHARE_URL||location.href.split('#')[0])+'#tape-'+d.share;try{await navigator.clipboard.writeText(u);toast('Link copied')}catch{toast('Copy this link: '+u)}}
 else if(d.dl){e.stopPropagation();const [id,j]=d.dl.split(':');el.disabled=true;await download(T(id),+j);el.disabled=false}
 else if(d.ring){e.stopPropagation();const [id,j]=d.ring.split(':');openRing(T(id),+j)}
 else if(d.zip)downloadZip(T(d.zip),el);
 else if(d.mp3)saveToPhone(T(d.mp3),el);
 else if(d.off){const t=T(d.off);el.disabled=true;offline.has(t.id)?await removeOffline(t):await saveOffline(t,el)}
 else if(d.rate){if(!needMe())return;const [id,n]=d.rate.split(':');try{await db.collection('ratings').doc(me+'_'+id).set({tape:id,by:me,stars:+n,ts:Date.now()});toast(`Rated ${n} star${n>1?'s':''}`)}catch{toast('Could not save rating')}}
 else if(d.promo)openSponsor(T(d.promo));
 else if(d.role){el.disabled=true;try{await user.setRole(d.role);myRole=d.role;toast(d.role==='artist'?'You can now drop tapes':'Switched to a fan account');route()}catch(err){toast('Could not switch: '+err.message);el.disabled=false}}
 else if(d.approve){const r=S.sponsor_requests.find(x=>x.id===d.approve),cur=S.sponsors.find(s=>s.id===r.tape),base=Math.max(Date.now(),+(cur?.until||0));el.disabled=true;
  try{await db.collection('sponsors').doc(r.tape).set({until:base+r.days*864e5,by:me});await db.collection('sponsor_requests').doc(r.id).delete();toast('Sponsorship approved')}catch(err){toast('Could not approve: '+err.message);el.disabled=false}}
 else if(d.decline){db.collection('sponsor_requests').doc(d.decline).delete().catch(err=>toast('Could not decline: '+err.message))}
 else if(d.unsp){db.collection('sponsors').doc(d.unsp).delete().catch(err=>toast('Could not end: '+err.message))}
 else if(d.del){if(armedDel!==d.del){armedDel=d.del;el.textContent='Tap again to delete for good';setTimeout(()=>{if(armedDel===d.del){armedDel=null;route()}},4000);return}
  armedDel=null;const t=T(d.del);el.disabled=true;try{await db.collection('tapes').doc(t.id).delete();for(const x of t.tracks)assets?.delete(x.asset).catch(()=>{});if(t.coverId)assets?.delete(t.coverId).catch(()=>{});if(t.takeoverId)assets?.delete(t.takeoverId).catch(()=>{});if(offline.has(t.id))removeOffline(t);toast('Tape deleted');location.hash=''}catch{toast('Could not delete this tape');el.disabled=false}}
 else if(d.delc){db.collection('comments').doc(d.delc).delete().catch(()=>toast('Could not delete comment'))}
 else if(d.mv){const [i,m]=d.mv.split(':').map(Number),k=i+m;if(k<0||k>=upFiles.length)return;[upFiles[i],upFiles[k]]=[upFiles[k],upFiles[i]];drawList()}
 else if(d.rm){upFiles.splice(+d.rm,1);drawList()}
 else if(d.cs){chartScope=d.cs;route()}else if(d.ls){listSort=d.ls;route()}
 else if(d.prem){const on=S.premieres.some(p=>p.id===d.prem),ref=db.collection('premieres').doc(d.prem);el.disabled=true;try{on?await ref.delete():await ref.set({by:me,ts:Date.now()});toast(on?'Moved to Indy':'Marked as a World Premiere')}catch(err){toast('Could not change: '+err.message);el.disabled=false}}
 else if(d.hg!==undefined){homeG=d.hg;route()}else if(d.sort){sortBy=d.sort;route()}else if(d.ct){chartTab=d.ct;route()}
 else if(d.hostq){query=d.hostq;route()}else if(d.genre){location.hash='genre-'+encodeURIComponent(d.genre)}
 else if(d.auth==='out'){await Backend.signOut();location.hash='';location.reload()}
 else if(d.ar){$$('[data-ar]').forEach(x=>x.classList.toggle('on',x===el))}
 else if(el.id==='a_sw'){e.preventDefault();const up=$('#a_namew').hidden;$('#a_namew').hidden=!up;$('#a_go').textContent=up?'Create account':'Sign in';$('#a_el').textContent=up?'Email':'Email or @username';$('#a_email').placeholder=up?'you@email.com':'you@email.com or @yourname';$('#a_q').textContent=up?'Have an account?':'New here?';el.textContent=up?'Sign in instead':'Create a free account';$('#a_h').textContent=up?'Join SovereignTapes':'Sign in to SovereignTapes';$('#a_forgot').hidden=up;$('#a_pw').autocomplete=up?'new-password':'current-password'}
 else if(d.j!==undefined){const t=T(d.tape);if(curTape&&curTape.id===t.id&&queue[qi]===+d.j){act('pp')}else playTape(t,+d.j)}
 else if(el.classList.contains('js-open'))openNP(true);
 else if(d.go)location.hash=d.go});
document.addEventListener('submit',async e=>{if(e.target.id!=='authf')return;e.preventDefault();const b=$('#a_go'),signup=!$('#a_namew').hidden,email=$('#a_email').value.trim(),pw=$('#a_pw').value;
 b.disabled=true;try{if(signup){const name=$('#a_name').value.trim();if(!name)throw new Error('Add your display or artist name');if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))throw new Error('Use your email address to create an account. You can pick your @username after.');if(!(pw.length>=10&&/[a-z]/i.test(pw)&&/\d/.test(pw)))throw new Error('Use at least 10 characters with letters and numbers');const role=$('[data-ar].on')?.dataset.ar||'fan';
   if(!await Backend.signUp(name,email,pw,role)){$('#authf').innerHTML=`<h2 style="margin-top:0">Check your inbox</h2><p class="sub">We sent a confirmation link to <b>${esc(email)}</b>. Open it on this device, then come back and sign in. Can't find it? Check spam.</p><a href="#account" class="btn" style="width:100%;justify-content:center;margin-top:14px" onclick="setTimeout(route)">Sign in</a>`;return}}
  else await Backend.signIn(email,pw);location.hash='';location.reload()}
 catch(err){b.disabled=false;if(err.code==='mfa_required')return Sec.challenge();toast(err.message||'Sign in failed')}});
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target.matches?.('.tile[data-go],.bn[data-go],.ft[data-go]'))location.hash=e.target.dataset.go});
window.addEventListener('st-toast',e=>toast(e.detail));
window.addEventListener('online',()=>{if(status==='offline')location.reload()});
setInterval(()=>{for(const id of reminders){const t=S.tapes.find(x=>x.id===id);if(t&&live(t)){reminders=reminders.filter(x=>x!==id);LS.set('st_rem',reminders);toast(`${t.title} by ${t.artist} just dropped`);refresh()}}},5000);

// ---------- admin dashboard ----------
const KLAB={tip:'Tips',sale:'Download sales',membership:'Memberships',hosting:'DJ hosting',plus:'Plus share paid out',boost:'Boosts',pro:'Artist Pro',tape:'Download sales',member:'Memberships',host:'DJ hosting',other:'Plus, Pro & sponsorships'};
const card=(v,l,hl)=>`<div class="kpi${hl?' hl':''}"><b>${v}</b><span>${l}</span></div>`;
async function loadAdmin(){const box=$('#adx');if(!box)return;let o,f=null,fe='';
 try{o=await db.rpc('admin_overview')}catch(e){box.innerHTML=`<div class="note">Dashboard unavailable: ${esc(e.message)}</div>`;return}
 try{f=await Backend.pay('finance',{days:30})}catch(e){fe=e.message}
 if(!$('#adx'))return;loadTrends(o);const u=o.users,t=o.tapes,sb=o.subs,a=o.activity,fees=o.artist_money.reduce((x,r)=>x+ +r.fee,0),afees=o.artist_money_all.reduce((x,r)=>x+ +r.fee,0);
 const days=[...Array(30)].map((_,i)=>{const d=new Date(Date.now()-(29-i)*864e5).toISOString().slice(0,10),r=a.daily.find(x=>x.day===d)||{};return[d,+r.plays||0,+r.downloads||0]}),dm=Math.max(1,...days.map(d=>d[1]+d[2]));
 box.innerHTML=`<h2>Money · last 30 days ${f&&!f.live?'<span class="tag lime" style="position:static">Stripe test mode</span>':''}</h2>
 ${f?`<div class="kpis">${card(money(f.net),'Your net revenue',1)}${card(money(f.gross),'Gross sales ('+f.sales+')')}${card(money(f.toArtists),'Paid to artists')}${card(money(f.stripeFees),'Stripe fees')}${card(money(f.available),'Stripe balance now')}${card(money(f.pending),'On the way')}</div>
  <div class="panel" style="margin-top:12px"><div class="kick">Sales by type</div>${Object.entries(f.byKind).sort((x,y)=>y[1]-x[1]).map(([k,v])=>`<div class="hb"><span>${KLAB[k]||k}</span><i style="width:${v/Math.max(1,f.gross)*100}%"></i><b>${money(v)}</b></div>`).join('')||'<p class="sub">No sales yet.</p>'}</div>`
  :`<div class="note">Stripe numbers unavailable${fe?': '+esc(fe):''}.</div>`}
 <div class="kpis" style="margin-top:12px">${card(money(fees),'Your cut of artist sales (30 days)')}${card(money(afees),'Your cut, all time')}${o.artist_money.map(r=>card(money(+r.gross),(KLAB[r.kind]||r.kind)+' · '+r.n)).join('')}</div>
 <h2>People</h2><div class="kpis">${card(num(u.total),'Accounts',1)}${card('+'+num(u.new7),'New this week')}${card('+'+num(u.new30),'New in 30 days')}${card(num(u.artists),'Artists')}${card(num(u.fans),'Fans')}${card(num(u.payees),'Artists with payouts')}</div>
 <h2>Subscriptions &amp; promotion</h2><div class="kpis">${card(num(sb.plus),'Plus members',1)}${card(num(sb.pro),'Artist Pro')}${card(num(sb.memberships),'Fan memberships')}${card(num(sb.boosts),'Active boosts')}${card(num(sb.sponsors),'Active sponsorships')}</div>
 <h2>Listening · last 30 days</h2><div class="kpis">${card(num(a.plays30),'Streams',1)}${card(num(a.downloads30),'Downloads')}${card(num(a.listeners30),'Listeners')}${card(num(t.total),'Tapes')}${card(num(t.upcoming),'Scheduled')}${card(num(t.paid),'Paid tapes')}${card(num(t.members),'Members-only')}</div>
 <div class="panel" style="margin-top:12px"><div class="kick">Streams + downloads per day</div><div class="spark">${days.map(([d,p,dl])=>`<i style="height:${Math.max(2,(p+dl)/dm*100)}%" title="${d}: ${p} streams, ${dl} downloads"></i>`).join('')}</div></div>
 <div class="two" style="margin-top:12px"><div class="panel"><div class="kick">Top tapes · 30 days</div>${o.top_tapes.map(x=>`<div class="hb"><span><a href="#tape-${x.id}">${esc(x.title)}</a> · ${esc(x.artist)}</span><i style="width:${x.n/Math.max(1,o.top_tapes[0].n)*100}%"></i><b>${num(+x.n)}</b></div>`).join('')||'<p class="sub">No plays yet.</p>'}</div>
 <div class="panel"><div class="kick">Top earning artists · 30 days</div>${o.top_earners.map(x=>`<div class="hb"><span>${esc(x.name||'Artist')}</span><i style="width:${x.net/Math.max(1,o.top_earners[0].net)*100}%"></i><b>${money(+x.net)}</b></div>`).join('')||'<p class="sub">No earnings yet.</p>'}</div></div>
 <h2>Admins</h2><div class="list">${o.admins.map(x=>`<div class="tr" style="grid-template-columns:minmax(0,1fr) auto;cursor:default"><div><b>${esc(x.name||'Admin')}</b>${x.owner?' <span class="tag lime" style="position:static">Owner</span>':''}<div class="d">${esc(x.email)}</div></div>${o.is_owner&&!x.owner?`<button class="btn ghost" data-unadmin="${esc(x.email)}">Remove</button>`:''}</div>`).join('')}</div>
 ${o.is_owner?`<form id="admf" class="row" style="margin-top:12px;max-width:520px"><input type="text" id="adm_e" inputmode="email" placeholder="Their account email" style="flex:1;min-width:0" required><button class="btn">Make admin</button></form><p class="sub" style="font-size:13px">Admins see this dashboard, approve sponsorships and can remove any tape or comment. Only you can add or remove admins.</p>`:''}`}
const bars=(rows,key,fmt)=>{const days=[...Array(30)].map((_,i)=>{const d=new Date(Date.now()-(29-i)*864e5).toISOString().slice(0,10),r=rows.find(x=>x.day===d);return[d,r?+r[key]:0]}),m=Math.max(1,...days.map(d=>d[1]));
 return`<div class="spark">${days.map(([d,v])=>`<i style="height:${Math.max(2,v/m*100)}%" title="${d}: ${fmt(v)}"></i>`).join('')}</div>`};
async function loadTrends(o){const box=$('#hqt');if(!box)return;let t;try{t=await db.rpc('admin_trends')}catch(e){box.innerHTML=`<div class="note">Trends unavailable: ${esc(e.message)}</div>`;return}
 const sb=o.subs,p=k=>toCents(CFG[k]||'0'),mrr=sb.plus*p('PLUS_PRICE')+sb.pro*p('PRO_PRICE')+t.verified_paid*p('VERIFY_PRICE'),fee30=t.revenue.reduce((x,r)=>x+ +r.fee,0),payers=sb.plus+sb.pro+t.verified_paid+sb.memberships;
 box.innerHTML=`<h2>At a glance</h2><div class="kpis">${card(money(mrr),'Monthly subscription income (est.)',1)}${card(money(mrr*12),'Yearly run rate (est.)')}${card(money(fee30),'Platform fees · 30 days')}${card(num(payers),'Paying subscriptions')}${card((o.users.total?Math.round(payers/o.users.total*1000)/10:0)+'%','Accounts that pay')}${card(num(t.verified_paid),'Paid Verified badges')}${card(num(t.verified_gift),'Gifted Verified badges')}</div>
 <div class="kpis" style="margin-top:12px">${card(num(t.dau),'Listeners today',1)}${card(num(t.wau),'Listeners this week')}${card((t.wau?Math.round(t.dau/t.wau*100):0)+'%','Daily stickiness')}${card(num(t.comments30),'Comments · 30 days')}${card(num(t.likes),'Likes')}${card(num(t.follows),'Follows')}${card(num(t.demand),'City requests')}</div>
 <div class="two" style="margin-top:12px"><div class="panel"><div class="kick">Platform fees per day · 30 days</div>${bars(t.revenue,'fee',money)}</div><div class="panel"><div class="kick">New accounts per day · 30 days</div>${bars(t.signups,'n',num)}</div></div>`}
document.addEventListener('click',e=>{if(e.target.closest('[data-hqr]'))loadAdmin()});
document.addEventListener('submit',async e=>{if(e.target.id!=='admf')return;e.preventDefault();try{await db.rpc('set_admin',{p_email:$('#adm_e').value,p_on:true});toast('Admin added');loadAdmin()}catch(err){toast(err.message)}});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-unadmin]');if(!b)return;try{await db.rpc('set_admin',{p_email:b.dataset.unadmin,p_on:false});toast('Admin removed');loadAdmin()}catch(err){toast(err.message)}});

document.addEventListener('submit',async e=>{if(e.target.id!=='dlset')return;e.preventDefault();const t=S.tapes.find(x=>x.id===e.target.dataset.tape);if(!t)return;
 const on=$('#ds_on').checked,c=toCents($('#ds_p').value),edv=$('#ds_ed').value.trim(),ed=edv?Math.floor(+edv):0;if(on&&(c<100||c>10000))return toast('Price must be $1 to $100');
 if(edv&&!(ed>=1&&ed<=100000))return toast('Copies must be a number from 1 to 100,000, or blank');if(ed&&ed<(+t.sold||0))return toast(`You already sold ${t.sold} copies, so the limit can't be lower than that`);
 const{id,...data}=t;try{await db.collection('tapes').doc(id).update({...data,price:on?c:0,listPrice:c||t.listPrice||0,edition:ed});toast(on?`Downloads now cost ${money(c)}. Streaming stays free.`:'Downloads are free again.')}catch(err){toast('Could not save: '+err.message)}});
document.addEventListener('change',e=>{if(e.target.id==='ds_on')e.target.form.requestSubmit()});

// ---------- shows and live bookings ----------
const pName=id=>prof(id).dj_name&&!S.tapes.some(t=>t.by===id)?prof(id).dj_name:(S.tapes.find(t=>t.by===id)?.artist||prof(id).name||prof(id).dj_name||'Artist');
const pHref=id=>{const t=S.tapes.find(x=>x.by===id);return t?`#artist-${hkey(t.artist)}`:prof(id).dj_name?`#dj-${hkey(prof(id).dj_name)}`:'#shows'};
const bookable=id=>{const p=prof(id);return !!(p.book_open&&p.book_price&&payReady(id))};
const bookBtn=id=>id&&id!==me&&bookable(id)?`<button class="btn ghost" data-gigreq="${id}">${ic('star')} Book for a show · from ${money(prof(id).book_price)}</button>`:'';
const mon=ts=>new Date(ts).toLocaleString(undefined,{month:'short'}),dayN=ts=>new Date(ts).getDate();
function showList(id,mineOnly){const l=S.shows.filter(x=>(!id||x.by===id)&&+x.at>Date.now()-864e5).sort((a,b)=>a.at-b.at);if(!l.length)return mineOnly?'<div class="empty">No shows yet. Add your next date below.</div>':'';
 return `${mineOnly?'':'<h2>Upcoming shows</h2>'}<div class="shows">${l.map(x=>`<div class="show"><div class="sdate"><b>${dayN(x.at)}</b><span>${mon(x.at)}</span></div><div style="min-width:0"><b>${esc(x.venue)}</b><div class="d">${esc(x.city)} · ${new Date(+x.at).toLocaleString(undefined,{weekday:'short',hour:'numeric',minute:'2-digit'})}${id?'':` · <a href="${pHref(x.by)}">${esc(pName(x.by))}</a>`}</div></div>
 ${/^https?:\/\//i.test(x.tickets||'')?`<a class="btn" href="${esc(x.tickets)}" target="_blank" rel="noopener">Tickets</a>`:''}${mineOnly||(me&&canEditAll)?`<button class="ib" data-delshow="${x.id}" title="Remove show">${ic('x')}</button>`:''}</div>`).join('')}</div>`}
const GST={requested:'Waiting for a price',quoted:'Price sent · waiting for payment',paid:'Booked and paid',declined:'Declined',cancelled:'Cancelled'};
V.shows=()=>{const talent=S.profiles.filter(p=>bookable(p.id)),mine=me?S.gigs.filter(g=>g.fan===me||g.to===me).sort((a,b)=>b.ts-a.ts):[];
 return `<div class="kick">Live</div><h1>Shows &amp; bookings</h1><p class="sub">See where artists and DJs are performing, and book them for your party, club night or event. Payments go through SovereignTapes.</p>
 ${showList(null)||'<h2>Upcoming shows</h2><div class="empty">No show dates yet. Artists add them from their Earn page.</div>'}
 <h2>Book an artist or DJ</h2>${talent.length?`<div class="talent">${talent.map(p=>`<div class="panel tal"><b><a href="${pHref(p.id)}">${esc(pName(p.id))}</a> ${proChip(p.id)}</b><div class="d">${p.dj_name&&!S.tapes.some(t=>t.by===p.id)?'DJ':'Artist'} · from ${money(p.book_price)}</div>${p.book_info?`<p class="sub" style="font-size:13px;margin:6px 0 0">${esc(p.book_info)}</p>`:''}${p.id!==me?`<button class="btn" data-gigreq="${p.id}" style="margin-top:10px">${ic('star')} Request a booking</button>`:'<span class="d">This is you</span>'}</div>`).join('')}</div>`:'<div class="empty">No one is taking bookings yet.</div>'}
 ${me?`<h2>Your bookings</h2>${mine.length?`<div class="list">${mine.map(g=>{const perf=g.to===me;return`<div class="tr gig" style="cursor:default"><div class="sdate"><b>${g.date?dayN(g.date):'?'}</b><span>${g.date?mon(g.date):''}</span></div><div style="min-width:0"><b>${perf?'Request from '+esc(g.fanName||'a fan'):'You booked '+esc(g.performer||pName(g.to))}</b><div class="d">${esc(g.venue)} · ${esc(g.city)}${g.budget?' · budget '+esc(g.budget):''}</div>${g.msg?`<div class="d">“${esc(g.msg)}”</div>`:''}<div class="d"><b style="color:var(--acc)">${GST[g.status]||g.status}</b>${g.quote?' · '+money(+g.quote):''}${g.reply?' · '+esc(g.reply):''}</div></div>
  <span class="row" style="gap:6px">${perf&&(g.status==='requested'||g.status==='quoted')?`<input type="text" class="gq" data-g="${g.id}" inputmode="decimal" placeholder="Price $" value="${g.quote?(g.quote/100).toFixed(2):''}" style="width:96px"><button class="btn" data-gquote="${g.id}">Send price</button><button class="btn ghost" data-gdecl="${g.id}">Decline</button>`:''}
  ${!perf&&g.status==='quoted'?`<button class="btn" data-gpay="${g.id}">Pay ${money(+g.quote)}</button>`:''}${!perf&&(g.status==='requested'||g.status==='quoted')?`<button class="btn ghost" data-gcancel="${g.id}">Cancel</button>`:''}</span></div>`}).join('')}</div>`:'<div class="empty">Requests you send or receive show up here.</div>'}`:`<div class="note" style="margin-top:20px">${signinLink('to book artists and DJs.')}</div>`}`};
V.bookings=V.shows;
function gigModal(to){if(!needMe())return;const p=prof(to);modal(`<div class="kick">Book</div><h2 style="margin:4px 0 6px">${esc(pName(to))}</h2><p class="sub">From ${money(p.book_price)}${p.book_info?' · '+esc(p.book_info):''}. Send your details; they reply with a price, then you pay here.</p>
 <form id="gigf"><label for="g_d">Date and time</label><input type="datetime-local" id="g_d" required><div class="two"><div><label for="g_c">City</label><input type="text" id="g_c" maxlength="60" required></div><div><label for="g_v">Venue or type of event</label><input type="text" id="g_v" maxlength="80" required></div></div>
 <label for="g_b">Your budget (optional)</label><input type="text" id="g_b" maxlength="20" placeholder="e.g. $800"><label for="g_m">Message</label><textarea id="g_m" rows="3" maxlength="400" placeholder="Set length, crowd size, anything they should know"></textarea><button class="btn wide" style="margin-top:12px">Send request</button></form>`);
 $('#gigf').onsubmit=async e=>{e.preventDefault();const d=new Date($('#g_d').value).getTime();if(!d||d<Date.now())return toast('Pick a future date');
  try{await db.collection('gigs').doc().set({fan:me,fanName:myName||'Fan',to,performer:pName(to),date:d,city:$('#g_c').value.trim(),venue:$('#g_v').value.trim(),budget:$('#g_b').value.trim(),msg:$('#g_m').value.trim(),status:'requested',ts:Date.now()});closeModal();toast('Request sent. You will see their price under Shows › Your bookings.');location.hash='shows'}catch(err){toast('Could not send: '+err.message)}}}
const gigSet=async(id,patch)=>{const g=S.gigs.find(x=>x.id===id);const{id:_,...rest}=g;await db.collection('gigs').doc(id).update({...rest,...patch})};
document.addEventListener('click',async e=>{const el=e.target.closest('[data-gigreq],[data-gquote],[data-gdecl],[data-gpay],[data-gcancel],[data-delshow]');if(!el)return;e.preventDefault();const d=el.dataset;
 try{if(d.gigreq)return gigModal(d.gigreq);
  if(d.gpay)return buy('gig',{gig:d.gpay});
  if(d.gquote){const c=toCents($(`.gq[data-g="${d.gquote}"]`).value);if(c<1000)return toast('Price must be at least $10');await gigSet(d.gquote,{quote:c,status:'quoted'});toast('Price sent')}
  if(d.gdecl){await gigSet(d.gdecl,{status:'declined'});toast('Declined')}
  if(d.gcancel){await gigSet(d.gcancel,{status:'cancelled'});toast('Cancelled')}
  if(d.delshow){await db.collection('shows').doc(d.delshow).delete();toast('Show removed')}}catch(err){toast(err.message)}});
document.addEventListener('submit',async e=>{if(e.target.id!=='showf')return;e.preventDefault();const at=new Date($('#sh_d').value).getTime();if(!at)return toast('Pick a date');
 const t=$('#sh_t').value.trim();if(t&&!/^https:\/\//.test(t))return toast('Ticket link must start with https://');
 try{await db.collection('shows').doc().set({by:me,at,venue:$('#sh_v').value.trim(),city:$('#sh_c').value.trim(),tickets:t,ts:Date.now()});toast('Show added');e.target.reset()}catch(err){toast('Could not add: '+err.message)}});

// ---------- money ----------
// ---- money splits (owner of a tape) ----
function splitForm(t){const sp=Array.isArray(t.splits)?t.splits:[],left=100-sp.reduce((a,x)=>a+(+x.pct||0),0);
 return `<form class="panel" id="splitf" data-tape="${t.id}"><div class="kick">Money splits</div><p class="sub" style="font-size:13px">Every download sale of this tape is split automatically between you and your collaborators. You keep ${left}%.</p>
 ${sp.map((x,i)=>`<div class="row" style="justify-content:space-between;margin:6px 0"><span><b>${esc(prof(x.uid).name||prof(x.uid).dj_name||'Collaborator')}</b> · ${+x.pct}%${payReady(x.uid)?'':' <span class="d">(no payouts yet, so their share goes to you until they set them up)</span>'}</span><button type="button" class="ib" data-unsplit="${t.id}:${i}" aria-label="Remove">${ic('x')}</button></div>`).join('')}
 ${sp.length<5?`<div class="row" style="gap:8px;margin-top:8px"><input type="text" id="sp_n" list="sp_list" placeholder="Collaborator's SovereignTapes name" style="flex:1;min-width:160px"><input type="text" id="sp_p" inputmode="numeric" placeholder="%" style="width:70px"><button class="btn">Add</button></div><datalist id="sp_list">${S.profiles.filter(p=>p.id!==t.by&&(p.name||p.dj_name)).map(p=>`<option value="${esc(p.name||p.dj_name)}">`).join('')}</datalist>`:''}</form>`}
const saveSplits=async(t,splits)=>{const{id,...data}=t;await db.collection('tapes').doc(id).update({...data,splits})};
document.addEventListener('submit',async e=>{if(e.target.id!=='splitf')return;e.preventDefault();const t=S.tapes.find(x=>x.id===e.target.dataset.tape);if(!t)return;
 const nm=$('#sp_n').value.trim().toLowerCase(),pct=Math.floor(+$('#sp_p').value),sp=Array.isArray(t.splits)?t.splits:[];
 const hits=S.profiles.filter(p=>p.id!==t.by&&(nm.startsWith('@')?(p.handle||'')===nm.slice(1):[p.name,p.dj_name].some(v=>(v||'').trim().toLowerCase()===nm)));
 if(!nm)return toast("Type your collaborator's name");if(!hits.length)return toast('No one on SovereignTapes has that name. Ask them to make an account first.');if(hits.length>1)return toast('More than one person has that name. Ask them for their exact display name.');
 if(sp.some(x=>x.uid===hits[0].id))return toast('They are already on this split');if(!(pct>=1&&pct<=100))return toast('Percent must be 1 to 100');
 if(sp.reduce((a,x)=>a+(+x.pct||0),0)+pct>100)return toast("Splits can't add up to more than 100%");
 try{await saveSplits(t,[...sp,{uid:hits[0].id,pct}]);toast(`${hits[0].name||hits[0].dj_name} now gets ${pct}% of every sale`)}catch(err){toast('Could not save: '+err.message)}});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-unsplit]');if(!b)return;const[tid,i]=b.dataset.unsplit.split(':'),t=S.tapes.find(x=>x.id===tid);if(!t)return;
 try{await saveSplits(t,(t.splits||[]).filter((_,j)=>j!==+i));toast('Removed from the split')}catch(err){toast('Could not save: '+err.message)}});

// ---- "Bring them to my city" demand ----
const DEM={};
const demandBox=(uid,name)=>uid?`<div class="panel demand" data-demand="${uid}"><div class="kick">${ic('star')} Bring ${esc(name||'them')} to your city</div><div class="dm-body"><p class="sub">Loading…</p></div></div>`:'';
async function demandData(a){const c=DEM[a];if(c&&Date.now()-c.t<6e4)return c;
 const d={t:Date.now(),rows:(await db.rpc('demand_for',{p_artist:a}))||[],mine:me&&me!==a?await db.rpc('my_demand',{p_artist:a}):null};return DEM[a]=d}
async function fillDemand(){if(!db)return;
 for(const el of $$('[data-demand]')){const a=el.dataset.demand,body=el.querySelector('.dm-body');try{const c=await demandData(a),tot=c.rows.reduce((s,r)=>s+(+r.fans||0),0);
  body.innerHTML=`<p class="sub">${tot?`${num(tot)} fan${tot>1?'s':''} asked for a show. Top cities: ${c.rows.slice(0,3).map(r=>`<b>${esc(r.city)}</b> (${r.fans})`).join(', ')}`:'No requests yet. Be the first to ask for a show near you.'}</p>${me===a?'':c.mine?`<p class="sub">You asked for <b>${esc(c.mine)}</b>. <button class="chip" data-undem="${a}">Remove</button></p>`:`<form class="row dmf" data-artist="${a}" style="gap:8px;margin-top:8px"><input type="text" name="city" maxlength="60" placeholder="Your city, e.g. Atlanta, GA" required style="flex:1;min-width:160px"><button class="btn">${ic('star')} I'd go</button></form>`}`}
  catch{body.innerHTML='<p class="sub">Could not load requests right now.</p>'}}
 for(const el of $$('[data-heat]')){try{const c=await demandData(el.dataset.heat),max=Math.max(1,...c.rows.map(r=>+r.fans||0));
  el.innerHTML=c.rows.length?c.rows.slice(0,15).map(r=>`<div class="heat"><span>${esc(r.city)}</span><i style="--w:${Math.round(100*r.fans/max)}%"></i><b>${r.fans}</b><button type="button" class="chip" data-showcity="${esc(r.city)}">Add a show here</button></div>`).join(''):`<p class="sub">No requests yet. Share your artist page so fans can tap "I'd go".</p>`}catch{el.innerHTML='<p class="sub">Could not load requests right now.</p>'}}}
document.addEventListener('submit',async e=>{const f=e.target.closest('.dmf');if(!f)return;e.preventDefault();if(!needMe())return;const a=f.dataset.artist,city=f.city.value.trim().replace(/\s+/g,' ').replace(/\s*,\s*/g,', ').split(', ').map((x,i)=>i&&x.length<=3?x.toUpperCase():x.toLowerCase().replace(/(^|[\s-])\S/g,c=>c.toUpperCase())).join(', ').slice(0,60);
 if(city.length<2)return toast('Type your city');try{await db.collection('demand').doc(a+'_'+me).set({artist:a,fan:me,city,ts:Date.now()});delete DEM[a];toast('Request sent. They can see where fans want a show.');fillDemand()}catch(err){toast('Could not save: '+err.message)}});
document.addEventListener('click',async e=>{const u=e.target.closest('[data-undem]'),sc=e.target.closest('[data-showcity]');
 if(u){const a=u.dataset.undem;try{await db.collection('demand').doc(a+'_'+me).delete();delete DEM[a];fillDemand()}catch(err){toast('Could not remove: '+err.message)}}
 if(sc){const c=$('#sh_c');if(c){c.value=sc.dataset.showcity;c.scrollIntoView({behavior:'smooth',block:'center'});$('#sh_d')?.focus()}}});

// ---- profile photo + cover (every account) and the Verified badge ----
const imgOf=p=>okPath(p)?Backend.url(p):'';
const avatarImg=id=>{const a=id&&prof(id).avatar;return okPath(a)?`<img class="avatar" decoding="async" src="${imgOf(a)}" alt="">`:''};
const banner=id=>{const b=id&&prof(id).banner;return okPath(b)?`<div class="pbanner" style="background-image:url('${imgOf(b)}')" role="img" aria-label="Profile cover"></div>`:''};
function profEdit(){const p=prof(me);return `<form class="panel" id="namef" style="max-width:520px;margin-top:14px"><div class="kick">Your names</div>
 <label for="nm_n">Display name</label><input id="nm_n" maxlength="40" value="${esc(p.name||'')}" autocomplete="nickname">
 <label for="nm_h">@name</label><div class="handlebox"><span>@</span><input id="nm_h" maxlength="20" value="${esc(p.handle||'')}" placeholder="yourname" autocapitalize="none" spellcheck="false"></div><p class="sub" id="nm_hint" style="font-size:13px">3 to 20 lowercase letters, numbers or _. Fans can find you by it.</p>
 <button class="btn">Save names</button></form><div class="panel profedit" style="max-width:520px;margin-top:14px"><div class="kick">Your profile look</div>
 <div class="pe-cover" style="${p.banner?`background-image:url('${imgOf(p.banner)}')`:''}"><div class="pe-av">${p.avatar?`<img src="${imgOf(p.avatar)}" alt="Your profile photo">`:ic('user')}</div></div>
 <div class="row" style="margin-top:12px"><label class="btn ghost">${ic('user')} Profile photo<input type="file" accept="image/jpeg,image/png,image/webp" data-pimg="avatar" hidden></label><label class="btn ghost">${ic('star')} Cover image<input type="file" accept="image/jpeg,image/png,image/webp" data-pimg="banner" hidden></label></div>
 <p class="sub" style="font-size:13px">Shows on your artist or DJ page. JPG, PNG or WebP.</p>
 ${isVerified(me)?`<p class="sub">${ic('check')} Verified${proUntil(me)?' with Artist Pro':S.verified.find(v=>v.id===me)?.gift?' · given by SovereignTapes':' until '+new Date(verUntil(me)).toLocaleDateString()}</p>`
  :`<div style="margin-top:8px"><b>Get the Verified badge</b><p class="sub" style="margin:4px 0 8px">A gold check next to your name on your pages and comments. ${esc(CFG.VERIFY_PRICE||'$10.99/month')}, cancel anytime. Included with Artist Pro.</p><button class="btn" data-verify>${ic('check')} Get verified</button></div>`}</div>`}
// shrink before upload: faster on phones and cheaper to store
async function shrink(file,max){const bmp=await createImageBitmap(file),k=Math.min(1,max/Math.max(bmp.width,bmp.height)),c=document.createElement('canvas');
 c.width=Math.round(bmp.width*k);c.height=Math.round(bmp.height*k);c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
 const b=await new Promise(r=>c.toBlob(r,'image/webp',.86));return b&&/^image\/(webp|png|jpeg)$/.test(b.type)?b:file}
document.addEventListener('change',async e=>{const k=e.target.dataset?.pimg,f=e.target.files?.[0];if(!k||!f)return;
 if(!/^image\/(jpeg|png|webp)$/.test(f.type)){e.target.value='';return toast('Use a JPG, PNG or WebP image')}
 try{toast('Uploading…');let blob=f;try{blob=await shrink(f,k==='avatar'?512:1600)}catch{blob=f}
  const up=await assets.uploadProfile(blob),p=prof(me),old=p[k],{id:_,...d}=p;await db.collection('profiles').doc(me).update({...d,[k]:up.id});
  if(old&&old.startsWith(me+'/profile/'))assets.delete(old).catch(()=>{});toast(k==='avatar'?'Profile photo updated':'Cover updated')}
 catch(err){toast('Could not upload: '+err.message)}e.target.value=''});
document.addEventListener('click',e=>{if(e.target.closest('[data-verify]'))buy('verify')});

// ---- Back button: in-app history, the same on web, desktop and phones ----
const NAV=(()=>{try{return JSON.parse(sessionStorage.getItem('st_nav'))||[]}catch{return[]}})();
function navTrack(){const h=location.hash.slice(1);if(NAV.length>1&&NAV[NAV.length-2]===h)NAV.pop();else if(NAV[NAV.length-1]!==h)NAV.push(h);
 if(NAV.length>50)NAV.splice(0,NAV.length-50);try{sessionStorage.setItem('st_nav',JSON.stringify(NAV))}catch{/* private mode */}}
function goBack(){if(NAV.length>1)history.back();else location.hash=''}
const backBtn=h=>h&&!/^error=/.test(h)?`<button class="backbtn" data-back aria-label="Go back">${ic('arrow')} Back</button>`:'';
document.addEventListener('click',e=>{if(e.target.closest('[data-back]')){e.preventDefault();goBack()}});
// Android back button: close an open window first, then go back, and leave the app only from Home
const CapApp=window.Capacitor?.Plugins?.App;
if(CapApp)CapApp.addListener('backButton',()=>{const m=$('#modal');if(m&&!m.hidden){closeModal();return}if(location.hash.length>1)goBack();else CapApp.exitApp()});

// ---- owner only: give any account a Verified badge for free ----
function giftPanel(){if(!prof(me).owner)return'';const gifts=S.verified.filter(v=>v.gift);
 return `<div class="panel" style="margin-top:16px"><div class="kick">${ic('check')} Verified badges</div><p class="sub">Give any account the gold Verified check for free, or take a given badge away. Paid badges aren't affected.</p>
 <div class="row" style="gap:8px"><input id="gv_e" inputmode="email" placeholder="their account email" style="flex:1;min-width:180px"><button class="btn" data-gift="1">${ic('check')} Give badge</button><button class="btn ghost" data-gift="0">Remove</button></div>
 ${gifts.length?`<p class="sub" style="margin-top:10px">Given by you: ${gifts.map(v=>`<b>${esc(prof(v.id).name||prof(v.id).dj_name||'Listener')}</b>`).join(', ')}</p>`:''}</div>`}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-gift]');if(!b)return;const email=($('#gv_e')?.value||'').trim();if(!email)return toast('Enter their account email');
 b.disabled=true;try{await db.rpc('gift_verified',{p_email:email,p_on:b.dataset.gift==='1'});toast(b.dataset.gift==='1'?'Verified badge given':'Given badge removed');$('#gv_e').value=''}
 catch(err){toast(err.message)}b.disabled=false});

// ---- display name and @name (everyone can change both; @names are unique) ----
const HANDLE=/^[a-z0-9_]{3,20}$/;
const atName=id=>{const h=id&&prof(id).handle;return h&&HANDLE.test(h)?`<p class="atname">@${h}</p>`:''};
let hTimer;
document.addEventListener('input',e=>{if(e.target.id!=='nm_h')return;const el=e.target,hint=$('#nm_hint');el.value=el.value.toLowerCase().replace(/[^a-z0-9_]/g,'').slice(0,20);
 clearTimeout(hTimer);const v=el.value;if(!v||v===prof(me).handle){hint.textContent='3 to 20 lowercase letters, numbers or _. Fans can find you by it.';return}
 if(!HANDLE.test(v)){hint.textContent='Use at least 3 characters';return}
 hTimer=setTimeout(async()=>{try{const free=await db.rpc('handle_free',{p_handle:v});if($('#nm_h')?.value===v)hint.textContent=free?`@${v} is available`:`@${v} is taken`}catch{/* checked again on save */}},350)});
document.addEventListener('submit',async e=>{if(e.target.id!=='namef')return;e.preventDefault();if(!needMe())return;
 const name=$('#nm_n').value.trim().replace(/\s+/g,' '),handle=$('#nm_h').value.trim();
 if(name.length<2)return toast('Display name needs at least 2 characters');if(handle&&!HANDLE.test(handle))return toast('Your @name can use 3 to 20 lowercase letters, numbers and _');
 const p=prof(me),{id:_,...d}=p;if(name===(p.name||'')&&handle===(p.handle||''))return toast('Nothing changed');
 const b=e.target.querySelector('button');b.disabled=true;
 try{await db.collection('profiles').doc(me).update({...d,name,handle:handle||undefined});myName=name.split(' ')[0];toast('Names saved')}
 catch(err){toast(/duplicate|unique/i.test(err.message)?`@${handle} is taken. Try another.`:err.message)}b.disabled=false});

function tipModal(to){const n=prof(to).name||'this artist';modal(`<div class="kick">Support</div><h2 style="margin:4px 0 6px">Tip ${esc(n)}</h2><p class="sub">Goes straight to the artist through Stripe.</p>
 <div class="chips" style="margin:14px 0">${[2,5,10,20].map(v=>`<button class="chip" data-tipv="${v}">$${v}</button>`).join('')}</div><label for="tipx">Or another amount (USD, 1 to 100)</label><input type="text" id="tipx" inputmode="decimal" placeholder="e.g. 7">
 <button class="btn wide" id="tipgo" style="margin-top:12px">Send tip</button>`);
 $('#mbox').onclick=e=>{const c=e.target.closest('[data-tipv]');if(c){$('#tipx').value=c.dataset.tipv;return}if(e.target.closest('#tipgo')){const a=toCents($('#tipx').value);if(a<100||a>10000)return toast('Pick an amount from $1 to $100');buy('tip',{to,amount:a,back:location.hash||'#'})}}}
function boostModal(t){modal(`<div class="kick">Boost</div><h2 style="margin:4px 0 6px">Push “${esc(t.title)}”</h2><p class="sub">Paid placement that starts as soon as payment goes through.</p>
 <div class="pk">${Object.entries(BOOSTS).map(([k,[n,pr,d]])=>`<div class="panel"><b>${n}</b><div class="sub">${esc(d)}</div><button class="btn" data-bk="${k}" style="margin-top:8px">${esc(pr)}</button></div>`).join('')}</div>
 <p class="sub" style="font-size:13px;margin-top:12px">Want fans to download it free too? Use Promote for a sponsorship.</p>`);
 $('#mbox').onclick=e=>{const b=e.target.closest('[data-bk]');if(b)buy('boost',{tape:t.id,boost:b.dataset.bk})}}
function bookModal(dj){const p=prof(dj);modal(`<div class="kick">Book a DJ</div><h2 style="margin:4px 0 6px">${esc(p.dj_name||'DJ')} · ${money(p.host_price)}</h2><p class="sub">They host and tag your tape. After paying, credit them in “Hosted by” when you drop it.</p>
 <label for="bknote">Tape name and what you need</label><textarea id="bknote" rows="3" maxlength="200"></textarea><button class="btn wide" id="bkgo" style="margin-top:12px">Book and pay</button>`);
 $('#mbox').onclick=e=>{if(e.target.closest('#bkgo'))buy('host',{to:dj,note:$('#bknote').value.trim(),back:'#earn'})}}
async function saveProfile(patch){const cur=prof(me);const{id,...rest}=cur;await db.collection('profiles').doc(me).set({...rest,name:cur.name||myName,role:myRole==='guest'?'fan':myRole,...patch})}
document.addEventListener('click',async e=>{const el=e.target.closest('[data-tip],[data-join],[data-buytape],[data-boost],[data-book],[data-deliv],[data-pro],#payConnect,#payDash,#plusShare');if(!el)return;const d=el.dataset;e.preventDefault();
 if(d.tip)return needMe()&&tipModal(d.tip);
 if(d.join)return buy('member',{to:d.join,back:location.hash||'#'});
 if(d.buytape)return buy('tape',{tape:d.buytape});
 if(d.boost){const t=S.tapes.find(x=>x.id===d.boost);return t&&boostModal(t)}
 if(d.book)return needMe()&&bookModal(d.book);
 if(d.pro!==undefined)return buy('pro');
 el.disabled=true;try{
  if(d.deliv){const b=S.bookings.find(x=>x.id===d.deliv);const{id,...rest}=b;await db.collection('bookings').doc(d.deliv).update({...rest,status:'done'});toast('Marked delivered')}
  else if(el.id==='payConnect'){toast('Opening Stripe…');location.href=(await Backend.pay('connect')).url}
  else if(el.id==='payDash'){window.open((await Backend.pay('dashboard')).url,'_blank','noopener')}
  else if(el.id==='plusShare'){const r=await Backend.pay('plus_share');toast(`${r.month}: paid ${money(r.paid)} to ${r.artists} artist${r.artists===1?'':'s'} from ${money(r.pool)} pool`)}}
 catch(err){toast(err.message)}el.disabled=false});
document.addEventListener('submit',async e=>{if(e.target.id!=='earnf')return;e.preventDefault();const mp=toCents($('#e_mp').value),hp=toCents($('#e_hp').value);
 if(mp&&(mp<100||mp>5000))return toast('Membership price must be $1 to $50');if(hp&&(hp<500||hp>100000))return toast('Hosting price must be $5 to $1,000');
 try{await saveProfile({member_price:mp,member_perks:$('#e_perks').value.trim(),dj_name:$('#e_dj').value.trim(),host_price:hp,dj_bio:$('#e_bio').value.trim(),host_open:$('#e_open').checked,book_open:$('#e_bo').checked,book_price:toCents($('#e_bp').value),book_info:$('#e_bi').value.trim()});toast('Saved')}catch(err){toast('Could not save: '+err.message)}});
(()=>{const q=new URLSearchParams(location.search),k=q.get('paid');if(!k)return;history.replaceState(null,'',location.pathname+location.hash);
 setTimeout(()=>toast({tip:'Thank you! Your tip is on its way to the artist.',tape:'Purchase complete. Your download is unlocked.',member:"You're a member now. Welcome in.",pro:'Welcome to Artist Pro. Your badge appears within a minute.',boost:'Boost paid. It goes live within a minute.',host:'Booking paid. The DJ has been notified.'}[k]||'Payment complete.'),800)})();

// ---------- boot ----------
route();
(async()=>{await loadOffline();[db,user,assets,dls]=await Promise.all(['db','user','assets','downloads'].map(use));
 const goOffline=()=>{S.tapes=[...offline.values()];status='offline';counts();route()};
 if(!db){if(offline.size)return goOffline();status='nodb';return route()}
 try{me=await user.id();canEditAll=await user.canEdit();if(navigator.onLine){const p=await user.me();myName=(p.name||'').split(' ')[0];myRole=p.role}}catch{}
 if(!navigator.onLine&&offline.size)goOffline();
 const keys=Object.keys(S),seen=new Set(),ready=()=>{clearTimeout(slow);status='ready';counts();route()};
 const slow=setTimeout(()=>{if(seen.size<keys.length){if(offline.size)goOffline();else{status='slow';route()}}},10000);
 for(const k of keys)db.collection(k).onSnapshot(s=>{S[k]=s.docs.filter(x=>SAFE_ID.test(x.id)).map(x=>({id:x.id,...x.data()}));seen.add(k);
  if(status!=='ready'&&seen.size===keys.length)ready();else if(status==='ready'||status==='slow')refresh()},
  ()=>{seen.add(k);if(status!=='ready'&&status!=='offline'&&seen.size===keys.length)ready()})})();
