/* ═══════════════════════════════════════════
   विद्यासागर — Main App JS
   ═══════════════════════════════════════════ */

/* ── CONFIG ── */
const API_BASE = 'https://gamvidyasagar-backende.onrender.com';

/* ── APP STATE ── */
const App = {
  user:            null,
  token:           null,
  selectedSubject: null,
  selectedSub:     null,
  selectedState:   null,
  quizQuestions:   [],
  quizIdx:         0,
  score:           0,
  quizLabel:       '',
  quizEmoji:       '📝',
  historyData:     [],
  quizStartTime:   null,
  currentTab:      'home',
  allQuestions:    {},   // loaded JSON data
  subjectsData:    null,
};

/* ══════════════════════════════════
   INIT
══════════════════════════════════ */
document.addEventListener('DOMContentLoaded', async () => {
  // Check saved session
  const savedToken = localStorage.getItem('vs_token');
  const savedUser  = localStorage.getItem('vs_user');
  if (savedToken && savedUser) {
    App.token = savedToken;
    App.user  = JSON.parse(savedUser);
  }

  await loadSubjectsData();

  // Loading screen → login/main
  setTimeout(() => {
    if (App.token && App.user) {
      enterApp(App.user, false);
    } else {
      showScreen('screen-login');
    }
  }, 2400);
});

/* ══════════════════════════════════
   DATA LOADING
══════════════════════════════════ */
async function loadSubjectsData() {
  try {
    const res = await fetch('data/subjects.json');
    App.subjectsData = await res.json();
  } catch {
    App.subjectsData = getDefaultSubjectsData();
  }
}

async function loadQuestions(subjectId) {
  if (App.allQuestions[subjectId]) return App.allQuestions[subjectId];
  const fileMap = {
    math:    'math.json',    english: 'english.json',
    hindi:   'hindi.json',   science: 'science.json',
    gk:      'gk.json',      computer:'computer.json',
    sanskrit:'sanskrit.json',current: 'current_affairs.json',
    states:  'states_gk.json'
  };
  try {
    const res = await fetch(`data/questions/${fileMap[subjectId] || 'gk.json'}`);
    App.allQuestions[subjectId] = await res.json();
  } catch {
    App.allQuestions[subjectId] = null;
  }
  return App.allQuestions[subjectId];
}

function getDefaultSubjectsData() {
  return {
    subjects: [
      { id:'math',    emoji:'🔢', name:'गणित',          count:'850+', color:'#f4820a' },
      { id:'english', emoji:'🔤', name:'English',        count:'720+', color:'#3b82f6' },
      { id:'hindi',   emoji:'📖', name:'हिंदी',          count:'600+', color:'#8b5cf6' },
      { id:'science', emoji:'🔬', name:'विज्ञान',        count:'540+', color:'#10b981' },
      { id:'gk',      emoji:'🌍', name:'सामान्य ज्ञान', count:'980+', color:'#ef4444' },
      { id:'computer',emoji:'💻', name:'Computer',       count:'430+', color:'#06b6d4' },
      { id:'sanskrit',emoji:'🕉️', name:'संस्कृत',        count:'280+', color:'#f59e0b' },
      { id:'current', emoji:'📰', name:'करंट अफेयर्स',  count:'320+', color:'#ec4899' }
    ],
    states: [
      'उत्तर प्रदेश','मध्य प्रदेश','राजस्थान','बिहार','महाराष्ट्र',
      'गुजरात','पंजाब','हरियाणा','उत्तराखंड','हिमाचल प्रदेश',
      'दिल्ली','छत्तीसगढ़','झारखंड','ओडिशा','पश्चिम बंगाल',
      'आंध्र प्रदेश','तेलंगाना','कर्नाटक','केरल','तमिलनाडु',
      'असम','गोवा','जम्मू-कश्मीर','मणिपुर','मेघालय',
      'नागालैंड','सिक्किम','त्रिपुरा'
    ]
  };
}

/* ══════════════════════════════════
   SCREEN MANAGEMENT
══════════════════════════════════ */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(id);
  el.classList.add('active');
  setTimeout(() => { el.scrollTop = 0; }, 50);
}

/* ══════════════════════════════════
   AUTH
══════════════════════════════════ */
function switchAuthTab(tab) {
  document.getElementById('form-login').style.display  = tab === 'login'  ? 'block' : 'none';
  document.getElementById('form-signup').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('tab-login').classList.toggle('active',  tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
  clearAuthMessages();
}

function clearAuthMessages() {
  document.querySelectorAll('.auth-error, .auth-success').forEach(el => {
    el.classList.remove('show'); el.textContent = '';
  });
}

function showAuthError(msg)   { const el = document.getElementById('auth-msg'); el.className = 'auth-error show';   el.textContent = '⚠️ ' + msg; }
function showAuthSuccess(msg) { const el = document.getElementById('auth-msg'); el.className = 'auth-success show'; el.textContent = '✅ ' + msg; }

async function doLogin() {
  const email    = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-pass').value.trim();
  if (!email || !password) return showAuthError('ईमेल और पासवर्ड दर्ज करें');

  const btn = document.getElementById('btn-login');
  btn.textContent = 'लॉगिन हो रहा है...'; btn.disabled = true;

  try {
    const res  = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    App.token = data.token; App.user = data.user;
    localStorage.setItem('vs_token', data.token);
    localStorage.setItem('vs_user',  JSON.stringify(data.user));
    showAuthSuccess('लॉगिन सफल! Loading...');
    setTimeout(() => enterApp(data.user, true), 800);
  } catch (err) {
    showAuthError(err.message || 'Server से जुड़ नहीं पाए। Skip करके जारी रखें।');
    btn.textContent = 'लॉगिन करें →'; btn.disabled = false;
  }
}

async function doSignup() {
  const name     = document.getElementById('signup-name').value.trim();
  const email    = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-pass').value.trim();
  if (!name || !email || !password) return showAuthError('सभी fields भरें');
  if (password.length < 6) return showAuthError('पासवर्ड कम से कम 6 अक्षर का होना चाहिए');

  const btn = document.getElementById('btn-signup');
  btn.textContent = 'बन रहा है...'; btn.disabled = true;

  try {
    const res  = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message);
    App.token = data.token; App.user = data.user;
    localStorage.setItem('vs_token', data.token);
    localStorage.setItem('vs_user',  JSON.stringify(data.user));
    showAuthSuccess('Account बन गया! Welcome 🎉');
    setTimeout(() => enterApp(data.user, true), 800);
  } catch (err) {
    showAuthError(err.message || 'Server से जुड़ नहीं पाए। Skip करके जारी रखें।');
    btn.textContent = 'Account बनाएं →'; btn.disabled = false;
  }
}

function skipLogin() {
  App.user  = { name: 'अतिथि', email: '', isGuest: true };
  App.token = null;
  enterApp(App.user, false);
}

function doLogout() {
  App.user = null; App.token = null;
  localStorage.removeItem('vs_token');
  localStorage.removeItem('vs_user');
  showScreen('screen-login');
  showToast('लॉगआउट हो गए', 'success');
}

/* ══════════════════════════════════
   ENTER APP
══════════════════════════════════ */
function enterApp(user, fetchHistory) {
  App.user = user;
  const initial = user.name.charAt(0).toUpperCase();

  document.getElementById('nav-avatar').textContent   = initial;
  document.getElementById('nav-username').textContent = user.name;
  document.getElementById('hist-avatar').textContent  = initial;
  document.getElementById('hist-name').textContent    = user.name;
  document.getElementById('hist-joined').textContent  =
    user.isGuest
      ? 'अतिथि मोड — History save नहीं होगी'
      : `जुड़े: ${formatDate(user.joinedAt || new Date())} • ${user.email}`;

  if (user.totalQuizzes !== undefined) {
    document.getElementById('hist-total').textContent   = user.totalQuizzes || 0;
    document.getElementById('hist-correct').textContent = user.totalCorrect  || 0;
    document.getElementById('hist-wrong').textContent   = user.totalWrong    || 0;
  }

  renderSubjectGrid();
  renderStatesGrid();
  showScreen('screen-main');
  switchTab('home');

  if (fetchHistory && App.token) loadHistory();
}

/* ══════════════════════════════════
   TAB SWITCHING
══════════════════════════════════ */
function switchTab(tab) {
  App.currentTab = tab;
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  const navEl   = document.getElementById('nav-' + tab);
  const panelEl = document.getElementById('panel-' + tab);
  if (navEl)   navEl.classList.add('active');
  if (panelEl) panelEl.classList.add('active');
  if (tab === 'history') renderHistory();
}

/* ══════════════════════════════════
   SUBJECT GRID
══════════════════════════════════ */
function renderSubjectGrid() {
  const subjects = App.subjectsData?.subjects || getDefaultSubjectsData().subjects;
  const grid = document.getElementById('subject-grid');
  grid.innerHTML = subjects.map(s => `
    <button class="subject-card" id="subj-${s.id}" onclick="selectSubject('${s.id}')"
      style="--card-color:${s.color}">
      <span class="subject-emoji">${s.emoji}</span>
      <span class="subject-name">${s.name}</span>
      <span class="subject-count">${s.count} प्रश्न</span>
    </button>`).join('');
}

async function selectSubject(id) {
  App.selectedSubject = id;
  App.selectedSub     = null;
  App.selectedState   = null;

  document.querySelectorAll('.subject-card').forEach(b => b.classList.remove('selected'));
  document.getElementById('subj-' + id).classList.add('selected');
  document.querySelectorAll('.state-chip').forEach(b => b.classList.remove('selected'));

  // Load questions to get categories
  const data = await loadQuestions(id);
  const subjects = App.subjectsData?.subjects || getDefaultSubjectsData().subjects;
  const subj = subjects.find(s => s.id === id);
  const cats = data?.categories ? Object.keys(data.categories) : [];

  const area = document.getElementById('subcategory-area');
  if (cats.length) {
    area.style.display = 'block';
    area.innerHTML = `
      <div class="subcategory-box">
        <div class="subcategory-label">${subj?.emoji || ''} ${subj?.name || id} — भाग चुनें:</div>
        <div class="sub-chips" id="sub-chips">
          ${cats.map(c => `<button class="sub-chip" id="sub-${safeId(c)}" onclick="selectSub('${c.replace(/'/g,"\\'")}','${safeId(c)}')">${c}</button>`).join('')}
        </div>
      </div>`;
  } else {
    area.style.display = 'none';
  }
  checkCanStart();
}

function selectSub(name, safeid) {
  App.selectedSub   = name;
  App.selectedState = null;
  document.querySelectorAll('.sub-chip').forEach(b => b.classList.remove('selected'));
  const el = document.getElementById('sub-' + safeid);
  if (el) el.classList.add('selected');
  document.querySelectorAll('.state-chip').forEach(b => b.classList.remove('selected'));
  checkCanStart();
}

/* ══════════════════════════════════
   STATES GRID
══════════════════════════════════ */
function renderStatesGrid() {
  const states = App.subjectsData?.states || getDefaultSubjectsData().states;
  const grid = document.getElementById('states-grid');
  grid.innerHTML = states.map(s => `
    <button class="state-chip" id="state-${safeId(s)}" onclick="selectState('${s.replace(/'/g,"\\'")}','${safeId(s)}')">${s}</button>`
  ).join('');
}

function selectState(name, safeid) {
  App.selectedState   = name;
  App.selectedSubject = null;
  App.selectedSub     = null;

  document.querySelectorAll('.subject-card').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.sub-chip').forEach(b => b.classList.remove('selected'));
  document.getElementById('subcategory-area').style.display = 'none';
  document.querySelectorAll('.state-chip').forEach(b => b.classList.remove('selected'));
  document.getElementById('state-' + safeid).classList.add('selected');
  checkCanStart();
}

function checkCanStart() {
  const ready = (App.selectedSubject && App.selectedSub) || App.selectedState;
  document.getElementById('btn-start').disabled = !ready;
}

/* ══════════════════════════════════
   QUIZ ENGINE
══════════════════════════════════ */
async function startQuiz() {
  let questions = [];
  const subjects = App.subjectsData?.subjects || getDefaultSubjectsData().subjects;

  if (App.selectedState) {
    App.quizLabel = App.selectedState + ' — राज्य GK';
    App.quizEmoji = '🗺️';
    const statesData = await loadQuestions('states');
    const stateQs = statesData?.states?.[App.selectedState];
    questions = stateQs || getFallbackQuestions();
  } else {
    const subj = subjects.find(s => s.id === App.selectedSubject);
    App.quizLabel = `${subj?.name || App.selectedSubject} — ${App.selectedSub}`;
    App.quizEmoji  = subj?.emoji || '📝';
    const data = await loadQuestions(App.selectedSubject);
    questions = data?.categories?.[App.selectedSub] || getFallbackQuestions();
  }

  // Shuffle and limit to 10
  App.quizQuestions = shuffle(questions).slice(0, Math.min(10, questions.length));
  App.quizIdx       = 0;
  App.score         = 0;
  App.quizStartTime = Date.now();

  document.getElementById('quiz-topic-label').textContent = App.quizLabel;
  showScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const total = App.quizQuestions.length;
  const q     = App.quizQuestions[App.quizIdx];
  const pct   = ((App.quizIdx + 1) / total * 100).toFixed(0);

  document.getElementById('quiz-counter').textContent = `प्रश्न ${App.quizIdx + 1} / ${total}`;
  document.getElementById('quiz-progress-bar').style.width = pct + '%';

  const labels = ['A', 'B', 'C', 'D'];
  document.getElementById('quiz-body').innerHTML = `
    <div class="q-num">प्रश्न ${App.quizIdx + 1} / ${total}</div>
    <div class="q-text">${q.q}</div>
    <div class="options-grid" id="options-grid">
      ${q.opts.map((opt, i) => `
        <button class="option-btn" id="opt-${i}" onclick="selectOption(${i})">
          <span class="option-label">${labels[i]}</span>
          <span>${opt}</span>
        </button>`).join('')}
    </div>
    <div class="quiz-footer">
      <div class="score-live">स्कोर: <strong>${App.score}/${App.quizIdx}</strong></div>
      <div class="quiz-actions">
        <button class="btn-quit" onclick="confirmQuit()">← वापस</button>
        <button class="btn-next" id="btn-next" onclick="nextQuestion()">अगला →</button>
      </div>
    </div>`;
}

function selectOption(idx) {
  const q = App.quizQuestions[App.quizIdx];
  document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
  document.getElementById(`opt-${q.ans}`).classList.add('correct');
  if (idx !== q.ans) {
    document.getElementById(`opt-${idx}`).classList.add('wrong');
  } else {
    App.score++;
  }
  document.querySelector('.score-live strong').textContent = `${App.score}/${App.quizIdx + 1}`;
  const nextBtn = document.getElementById('btn-next');
  nextBtn.style.display = 'block';
  nextBtn.textContent = App.quizIdx + 1 >= App.quizQuestions.length ? 'परिणाम देखें ✓' : 'अगला →';
}

function nextQuestion() {
  App.quizIdx++;
  if (App.quizIdx >= App.quizQuestions.length) { showResult(); return; }
  renderQuestion();
}

function confirmQuit() {
  if (confirm('क्या आप वाकई क्विज़ छोड़ना चाहते हैं?')) {
    showScreen('screen-main');
    switchTab('quiz');
  }
}

/* ── RESULT ── */
async function showResult() {
  const total    = App.quizQuestions.length;
  const pct      = Math.round(App.score / total * 100);
  const timeTaken = Math.round((Date.now() - App.quizStartTime) / 1000);
  const emoji    = pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : pct >= 40 ? '📚' : '💪';
  const msg      = pct >= 80 ? 'शानदार प्रदर्शन!' : pct >= 60 ? 'बहुत अच्छा!' : pct >= 40 ? 'और मेहनत करें!' : 'हार मत मानो!';
  const grade    = pct >= 80 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'D';

  document.getElementById('quiz-body').outerHTML = '';

  const wrap = document.createElement('div');
  wrap.className = 'result-wrap';
  wrap.innerHTML = `
    <div class="result-card">
      <span class="result-emoji">${emoji}</span>
      <div class="result-title">${msg}</div>
      <div style="font-size:13px;color:var(--text-muted);margin-bottom:4px">${App.quizLabel}</div>
      <div class="result-score">${pct}%</div>
      <div class="result-sub">Grade: ${grade} &nbsp;|&nbsp; समय: ${formatTime(timeTaken)} &nbsp;|&nbsp; ${App.score}/${total} सही</div>
      <div class="result-stats">
        <div class="r-stat"><div class="r-stat-num r-correct">${App.score}</div><div class="r-stat-label">✅ सही</div></div>
        <div class="r-stat"><div class="r-stat-num r-wrong">${total - App.score}</div><div class="r-stat-label">❌ गलत</div></div>
        <div class="r-stat"><div class="r-stat-num" style="color:var(--gold)">${grade}</div><div class="r-stat-label">🎖️ Grade</div></div>
      </div>
      <div class="result-btns">
        <button class="btn-secondary" onclick="restartQuiz()">🔄 फिर खेलें</button>
        <button class="btn-primary" style="max-width:160px;padding:12px 20px;font-size:14px" onclick="goBackHome()">🏠 होम</button>
      </div>
    </div>`;

  document.getElementById('screen-quiz').appendChild(wrap);

  // Save to local history
  const entry = {
    subject: App.quizLabel, score: App.score, total,
    percentage: pct, emoji: App.quizEmoji,
    date: new Date().toLocaleDateString('hi-IN'),
    timeTaken
  };
  App.historyData.unshift(entry);
  updateLocalHistoryStats();

  // Save to backend if logged in
  if (App.token && !App.user?.isGuest) {
    try {
      await fetch(`${API_BASE}/history/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${App.token}` },
        body: JSON.stringify({
          subject: App.selectedSubject || 'states',
          subCategory: App.selectedSub || '',
          state: App.selectedState || '',
          score: App.score, total, timeTaken
        })
      });
    } catch { /* silent fail */ }
  }
}

function restartQuiz() {
  App.quizIdx   = 0;
  App.score     = 0;
  App.quizStartTime = Date.now();
  const resultWrap = document.querySelector('.result-wrap');
  if (resultWrap) resultWrap.remove();

  // Re-create quiz-body
  const body = document.createElement('div');
  body.id = 'quiz-body';
  body.className = 'quiz-body';
  document.getElementById('screen-quiz').appendChild(body);

  App.quizQuestions = shuffle(App.quizQuestions);
  renderQuestion();
}

function goBackHome() {
  const resultWrap = document.querySelector('.result-wrap');
  if (resultWrap) resultWrap.remove();
  const body = document.createElement('div');
  body.id = 'quiz-body'; body.className = 'quiz-body';
  document.getElementById('screen-quiz').appendChild(body);
  showScreen('screen-main');
  switchTab('home');
}

/* ══════════════════════════════════
   HISTORY
══════════════════════════════════ */
async function loadHistory() {
  if (!App.token) return;
  try {
    const res  = await fetch(`${API_BASE}/history`, {
      headers: { Authorization: `Bearer ${App.token}` }
    });
    const data = await res.json();
    if (data.success) {
      App.historyData = data.history.map(h => ({
        subject:    h.subject,
        score:      h.score,
        total:      h.total,
        percentage: h.percentage,
        emoji:      '📝',
        date:       new Date(h.playedAt).toLocaleDateString('hi-IN'),
        timeTaken:  h.timeTaken
      }));
      updateLocalHistoryStats();
    }
  } catch { /* silent */ }
}

function renderHistory() {
  updateLocalHistoryStats();
  const list = document.getElementById('history-list');
  if (!App.historyData.length) {
    list.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📭</div>
        <div class="empty-title">अभी कोई Quiz नहीं खेली</div>
        <div class="empty-desc">Quiz सेक्शन में जाएं और शुरुआत करें!</div>
      </div>`;
    return;
  }
  list.innerHTML = `<div class="history-list">
    ${App.historyData.map(h => {
      const pct = h.percentage || Math.round(h.score / h.total * 100);
      const cls = pct >= 70 ? 'good' : pct >= 40 ? 'avg' : 'low';
      return `
        <div class="history-item">
          <div class="hist-icon">${h.emoji}</div>
          <div class="hist-info">
            <div class="hist-title">${h.subject}</div>
            <div class="hist-date">📅 ${h.date}${h.timeTaken ? ' &nbsp;⏱️ ' + formatTime(h.timeTaken) : ''}</div>
          </div>
          <div class="hist-badge ${cls}">${h.score}/${h.total} — ${pct}%</div>
        </div>`;
    }).join('')}
  </div>`;
}

function updateLocalHistoryStats() {
  const totalCorrect = App.historyData.reduce((a, b) => a + b.score, 0);
  const totalWrong   = App.historyData.reduce((a, b) => a + (b.total - b.score), 0);
  document.getElementById('hist-total').textContent   = App.historyData.length;
  document.getElementById('hist-correct').textContent = totalCorrect;
  document.getElementById('hist-wrong').textContent   = totalWrong;
}

/* ══════════════════════════════════
   TOAST NOTIFICATION
══════════════════════════════════ */
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ══════════════════════════════════
   UTILITIES
══════════════════════════════════ */
function safeId(str) {
  return str.replace(/[^a-zA-Z0-9\u0900-\u097F]/g, '_');
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function formatDate(dateStr) {
  try { return new Date(dateStr).toLocaleDateString('hi-IN'); }
  catch { return '—'; }
}

function formatTime(seconds) {
  if (!seconds) return '—';
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}मि ${s}से` : `${s}से`;
}

function getFallbackQuestions() {
  return [
    { q:'भारत की राजधानी क्या है?', opts:['मुंबई','दिल्ली','कोलकाता','चेन्नई'], ans:1 },
    { q:'भारत में कितने राज्य हैं?', opts:['28','29','30','31'], ans:0 },
    { q:'भारत का राष्ट्रीय पशु कौन सा है?', opts:['शेर','हाथी','बाघ','मोर'], ans:2 },
    { q:'भारत का संविधान कब लागू हुआ?', opts:['15 अगस्त 1947','26 जनवरी 1950','26 नवंबर 1949','2 अक्टूबर 1948'], ans:1 },
    { q:'भारत के प्रथम प्रधानमंत्री कौन थे?', opts:['सरदार पटेल','डॉ. राजेंद्र प्रसाद','जवाहरलाल नेहरू','डॉ. अंबेडकर'], ans:2 },
  ];
}
