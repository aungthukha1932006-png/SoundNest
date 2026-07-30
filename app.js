/* app.js - single-folder demo without external JSON
   - Put this file in the same folder as your HTML/CSS and media files.
   - Edit SONGS_DATA to add/remove songs (filenames must match).
*/

/* ---------------------------
   1) Songs data (edit here)
   --------------------------- */
const SONGS_DATA = [
  {
    id: "song1",
    title: "Sailor Song",
    artist: "Gigi Perez",
    albumImage: "album1.jpg",
    video: "song1.mp4",
    duration: "3:32",
    tags: ["pop","trending"]
  },
  {
    id: "song2",
    title: "What's my Name",
    artist: "Reload&Shine",
    albumImage: "album2.jpg",
    video: "song2.mp4",
    duration: "4:08",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "One of the Girls",
    artist: "The Weekend,Jennie,Lily Rose-Deep",
    albumImage: "album3.jpg",
    video: "song3.mp4",
    duration: "4:18",
    tags: ["chill","trending","trending"]
  },
  {
    id: "song2",
    title: "Birds of a feather",
    artist: "Billie Eilish",
    albumImage: "album4.jpg",
    video: "song4.mp4",
    duration: "3:51",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Ocean Eyes",
    artist: "Billie Eilish",
    albumImage: "album5.jpg",
    video: "song5.mp4",
    duration: "3:20",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "About You",
    artist: "The 1975",
    albumImage: "album6.jpg",
    video: "song6.mp4",
    duration: "5:26",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Rewrite the Stars",
    artist: "Anne-Marie & James",
    albumImage: "album7.jpg",
    video: "song7.mp4",
    duration: "3:47",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Perfect",
    artist: "Ed Sheeran",
    albumImage: "album8.jpg",
    video: "song8.mp4",
    duration: "4:24",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Ghost",
    artist: "Justin Bieber",
    albumImage: "album9.jpg",
    video: "song9.mp4",
    duration: "3:32",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Die With A Smile",
    artist: "Lady Gaga & Bruno Mars",
    albumImage: "album10.jpg",
    video: "song10.mp4",
    duration: "4:12",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Merry Christmas,I Miss You",
    artist: "Alex Crichton",
    albumImage: "album11.jpg",
    video: "song11.mp4",
    duration: "4:07",
    tags: ["chill","trending"]
  },
  {
    id: "song2",
    title: "Love Story",
    artist: "Taylor Swift",
    albumImage: "album12.jpg",
    video: "song12.mp4",
    duration: "4:12",
    tags: ["chill","trending"]
  }
];

/* ---------------------------
   2) SoundNest SVG logo injector
   --------------------------- */
const svgMarkup = `
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="48" viewBox="0 0 240 48" role="img" aria-label="SoundNest logo">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#7b2ff7"/>
      <stop offset="1" stop-color="#a044ff"/>
    </linearGradient>
    <filter id="s" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <g transform="translate(6,4)" filter="url(#s)">
    <rect x="0" y="0" width="40" height="40" rx="8" fill="url(#g)"/>
    <path d="M12 24c2-4 6-6 10-6s8 2 10 6" fill="none" stroke="rgba(255,255,255,0.95)" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 18c1-2 3-3 6-3s5 1 6 3" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="1.6" stroke-linecap="round"/>
  </g>

  <text x="60" y="30" font-family="Inter, system-ui, -apple-system, Roboto, Arial, sans-serif"
        font-weight="700" font-size="18" fill="#fff" letter-spacing="0.2">
    SoundNest
  </text>
</svg>`;

function svgToDataUri(svg) {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg.trim());
}
const LOGO_DATA_URI = svgToDataUri(svgMarkup);

function injectSoundNestLogo() {
  const logoEls = document.querySelectorAll('.logo');
  if (!logoEls || logoEls.length === 0) return;
  logoEls.forEach(el => {
    const img = document.createElement('img');
    img.src = LOGO_DATA_URI;
    img.alt = 'SoundNest logo';
    img.className = 'logo-img';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.borderRadius = '8px';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    if (el.tagName.toLowerCase() === 'img') {
      el.src = LOGO_DATA_URI;
      el.alt = 'SoundNest logo';
      el.classList.add('logo-img');
    } else {
      el.innerHTML = '';
      el.appendChild(img);
    }
  });
}

/* ---------------------------
   3) Rendering helpers
   --------------------------- */
function escapeHtml(str){
  if(!str) return '';
  return String(str).replace(/[&<>"']/g, function(m){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]; });
}

function renderSongs(container, songs){
  container.innerHTML = '';
  if(!songs || songs.length === 0){
    container.innerHTML = '<div style="color:var(--muted); padding:12px">No songs found.</div>';
    return;
  }
  songs.forEach(s=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${escapeHtml(s.albumImage)}" alt="${escapeHtml(s.title)}" loading="lazy">
      <h3>${escapeHtml(s.title)}</h3>
      <p>${escapeHtml(s.artist)} • ${escapeHtml(s.duration || '')}</p>
      <video controls preload="metadata" poster="${escapeHtml(s.albumImage)}" playsinline>
        <source src="${escapeHtml(s.video)}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
    container.appendChild(card);
  });
}

/* ---------------------------
   4) Page initializers
   --------------------------- */
function initHome(){
  const container = document.getElementById('home-grid');
  if(!container) return;
  renderSongs(container, SONGS_DATA.slice(0,8));
}

function initTrending(){
  const container = document.getElementById('trending-grid');
  if(!container) return;
  const trending = SONGS_DATA.filter(s => (s.tags||[]).map(t=>t.toLowerCase()).includes('trending'));
  renderSongs(container, trending);
}

function initSearch(){
  const container = document.getElementById('search-grid');
  const input = document.getElementById('search-input');
  if(!container || !input) return;
  function doSearch(){
    const q = input.value.trim().toLowerCase();
    if(!q) return renderSongs(container, SONGS_DATA);
    const results = SONGS_DATA.filter(s => {
      return (s.title||'').toLowerCase().includes(q) ||
             (s.artist||'').toLowerCase().includes(q) ||
             (s.tags||[]).some(t => t.toLowerCase().includes(q));
    });
    renderSongs(container, results);
  }
  input.addEventListener('input', doSearch);
  renderSongs(container, SONGS_DATA);
}

/* ---------------------------
   5) Simple auth (localStorage demo)
   --------------------------- */
function authSignup(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = form.querySelector('[name=email]').value.trim();
    const pass = form.querySelector('[name=password]').value;
    if(!email || !pass){ alert('Enter email and password'); return; }
    if(localStorage.getItem('user_'+email)){ alert('Account exists'); return; }
    localStorage.setItem('user_'+email, JSON.stringify({email, password:pass}));
    localStorage.setItem('logged_in', email);
    alert('Signup successful');
    window.location.href = './index.html';
  });
}

function authLogin(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = form.querySelector('[name=email]').value.trim();
    const pass = form.querySelector('[name=password]').value;
    const stored = localStorage.getItem('user_'+email);
    if(!stored){ alert('No account found'); return; }
    const user = JSON.parse(stored);
    if(user.password !== pass){ alert('Incorrect password'); return; }
    localStorage.setItem('logged_in', email);
    alert('Login successful');
    window.location.href = './index.html';
  });
}

function authReset(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = form.querySelector('[name=email]').value.trim();
    const stored = localStorage.getItem('user_'+email);
    if(!stored){ alert('No account found'); return; }
    const user = JSON.parse(stored);
    user.password = 'password123';
    localStorage.setItem('user_'+email, JSON.stringify(user));
    alert('Password reset. New password: password123');
    window.location.href = './login.html';
  });
}

/* ---------------------------
   6) Hamburger menu behavior
   --------------------------- */
(function(){
  function setupHamburger(){
    const btn = document.getElementById('hamburger');
    const nav = document.querySelector('.nav');
    if(!btn || !nav) return;
    btn.addEventListener('click', ()=>{
      if(nav.style.display === 'flex' || nav.style.display === '') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '1rem';
        nav.style.top = '64px';
        nav.style.background = 'rgba(0,0,0,0.12)';
        nav.style.padding = '0.5rem';
        nav.style.borderRadius = '8px';
        nav.style.zIndex = '60';
      }
    });

    document.addEventListener('click', (e)=>{
      if(!nav.contains(e.target) && !btn.contains(e.target) && window.innerWidth <= 720){
        nav.style.display = 'none';
      }
    });

    window.addEventListener('resize', ()=>{
      if(window.innerWidth > 720){
        nav.style.display = 'flex';
        nav.style.position = '';
        nav.style.flexDirection = '';
        nav.style.background = '';
      } else {
        nav.style.display = 'none';
      }
    });
  }
  document.addEventListener('DOMContentLoaded', setupHamburger);
})();

/* ---------------------------
 /* ---------------------------
   Auth helpers and logout UI
   --------------------------- */
function getLoggedInUser() {
  const v = localStorage.getItem('logged_in');
  return v ? String(v).trim().toLowerCase() : null;
}

function setLoggedInUser(email) {
  if (email) localStorage.setItem('logged_in', String(email).trim().toLowerCase());
  else localStorage.removeItem('logged_in');
}

function doLogout(redirectTo = './login.html') {
  setLoggedInUser(null);
  renderAuthControls('.auth-controls');
  alert('You have been logged out.');
  if (redirectTo) window.location.href = redirectTo;
}

function renderAuthControls(containerSelector = '.auth-controls') {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const logged = getLoggedInUser();
  container.innerHTML = '';

  if (logged) {
    const nameEl = document.createElement('span');
    nameEl.className = 'auth-username';
    nameEl.textContent = logged;

    const btn = document.createElement('button');
    btn.className = 'btn-logout';
    btn.type = 'button';
    btn.textContent = 'Logout';
    btn.addEventListener('click', () => doLogout('./login.html'));

    container.appendChild(nameEl);
    container.appendChild(btn);
  } else {
    const loginLink = document.createElement('a');
    loginLink.href = './login.html';
    loginLink.className = 'auth-link';
    loginLink.textContent = 'Login';

    const signupLink = document.createElement('a');
    signupLink.href = './signup.html';
    signupLink.className = 'auth-link';
    signupLink.textContent = 'Signup';

    container.appendChild(loginLink);
    container.appendChild(signupLink);
  }
}

/* ---------------------------
   5a) Default admin account (use email key) + helper
   --------------------------- */
(function(){
  function userStorageKey(raw) {
    if(!raw) return '';
    const v = String(raw).trim().toLowerCase();
    return 'user_' + v;
  }

  const adminKey = userStorageKey('admin@gmail.com');
  if(!localStorage.getItem(adminKey)){
    localStorage.setItem(adminKey, JSON.stringify({ email:'admin@gmail.com', password:'12345' }));
  }

  window._soundnest_userKey = userStorageKey;
})();

/* ---------------------------
   Auth functions (signup / login / reset)
   --------------------------- */
function authSignup(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const emailRaw = form.querySelector('[name=email]').value || '';
    const pass = form.querySelector('[name=password]').value || '';
    const email = emailRaw.trim().toLowerCase();
    if(!email || !pass){ alert('Enter email and password'); return; }

    const key = (window._soundnest_userKey && window._soundnest_userKey(email)) || ('user_' + email);
    if(localStorage.getItem(key)){ alert('Account exists'); return; }

    localStorage.setItem(key, JSON.stringify({ email: email, password: pass }));
    setLoggedInUser(email);
    renderAuthControls('.auth-controls');
    alert('Signup successful');
    window.location.href = './index.html';
  });
}

function authLogin(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const emailRaw = form.querySelector('[name=email]').value || '';
    const pass = form.querySelector('[name=password]').value || '';
    const email = emailRaw.trim().toLowerCase();
    if(!email || !pass){ alert('Enter email and password'); return; }

    const key = (window._soundnest_userKey && window._soundnest_userKey(email)) || ('user_' + email);
    const stored = localStorage.getItem(key);
    if(!stored){ alert('No account found'); return; }
    const user = JSON.parse(stored);
    if(user.password !== pass){ alert('Incorrect password'); return; }
    setLoggedInUser(email);
    renderAuthControls('.auth-controls');
    alert('Login successful');
    window.location.href = './index.html';
  });
}

function authReset(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const emailRaw = form.querySelector('[name=email]').value || '';
    const email = emailRaw.trim().toLowerCase();
    if(!email){ alert('Enter your email'); return; }

    const key = (window._soundnest_userKey && window._soundnest_userKey(email)) || ('user_' + email);
    const stored = localStorage.getItem(key);
    if(!stored){ alert('No account found'); return; }
    const user = JSON.parse(stored);
    user.password = 'password123';
    localStorage.setItem(key, JSON.stringify(user));
    alert('Password reset. New password: password123');
    window.location.href = './login.html';
  });
}

/* ---------------------------
   5b) Require login to play music (event delegation)
   --------------------------- */
function requireLoginForVideos(){
  document.addEventListener('play', function(e){
    const target = e.target;
    if(!target || target.tagName !== 'VIDEO') return;
    const logged = getLoggedInUser();
    if(!logged){
      try { target.pause(); } catch(err){}
      e.preventDefault();
      alert('You must log in to listen. Default account: admin@gmail.com / 12345');
      window.location.href = './login.html';
    }
  }, true);
}

/* ---------------------------
   5c) Contact Us form handler (mailto fallback)
   --------------------------- */
function initContactForm(formId){
  const form = document.getElementById(formId);
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = form.querySelector('[name=name]').value.trim();
    const email = form.querySelector('[name=email]').value.trim();
    const msg = form.querySelector('[name=message]').value.trim();
    if(!name || !email || !msg){ alert('Please fill all fields'); return; }

    // If you later add a server endpoint, replace this mailto with a fetch to /send-feedback
    const subject = encodeURIComponent("SoundNest Feedback from " + name);
    const body = encodeURIComponent("From: " + name + " (" + email + ")\n\n" + msg);
    window.location.href = "mailto:aungthukha1932006@gmail.com?subject=" + subject + "&body=" + body;

    alert('Thank you for your feedback!');
    form.reset();
  });
}

/* ---------------------------
   7) DOM ready wiring (single consolidated)
   --------------------------- */
document.addEventListener('DOMContentLoaded', ()=>{
  injectSoundNestLogo();

  // render auth controls in header (ensure .auth-controls exists in your header)
  renderAuthControls('.auth-controls');

  if(document.getElementById('home-grid')) initHome();
  if(document.getElementById('trending-grid')) initTrending();
  if(document.getElementById('search-grid')) initSearch();

  if(document.getElementById('signup-form')) authSignup('signup-form');
  if(document.getElementById('login-form')) authLogin('login-form');
  if(document.getElementById('reset-form')) authReset('reset-form');
  if(document.getElementById('contact-form')) initContactForm('contact-form');

  requireLoginForVideos(); // enforce login before playing (delegated)
});
function injectSoundNestLogo() {
  const logoEls = document.querySelectorAll('.logo');
  if (!logoEls || logoEls.length === 0) return;
  logoEls.forEach(el => {
    // If element is an <img>, set src directly
    if (el.tagName.toLowerCase() === 'img') {
      el.src = LOGO_DATA_URI;
      el.alt = 'SoundNest logo';
      el.classList.add('logo-img');
      el.style.display = 'block';
      return;
    }

    // If it contains an <img>, update that img
    const existingImg = el.querySelector('img');
    if (existingImg) {
      existingImg.src = LOGO_DATA_URI;
      existingImg.alt = 'SoundNest logo';
      existingImg.classList.add('logo-img');
      existingImg.style.display = 'block';
      return;
    }

    // Otherwise create and append an <img>
    el.innerHTML = '';
    const img = document.createElement('img');
    img.src = LOGO_DATA_URI;
    img.alt = 'SoundNest logo';
    img.className = 'logo-img';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.display = 'block';
    el.appendChild(img);
  });
}
