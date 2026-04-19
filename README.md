# 📚 विद्यासागर — Advanced Quiz Platform

> भारत का सबसे बड़ा हिंदी Quiz Platform — गणित, English, GK, राज्य परीक्षाएं और बहुत कुछ।

---

## 🗂️ Project Structure

```
vidyasagar/
├── backend/                    ← Node.js + Express Server
│   ├── models/
│   │   ├── User.js             ← User schema (MongoDB)
│   │   └── QuizHistory.js      ← Quiz history schema
│   ├── routes/
│   │   ├── auth.js             ← Signup, Login, Profile APIs
│   │   └── history.js          ← Save & Get quiz history APIs
│   ├── middleware/
│   │   └── authMiddleware.js   ← JWT token verification
│   ├── server.js               ← Main Express server
│   ├── package.json
│   └── .env.example            ← Environment variables template
│
└── frontend/                   ← Pure HTML + CSS + JS (No framework)
    ├── css/
    │   └── style.css           ← Complete stylesheet
    ├── js/
    │   └── app.js              ← Main application logic
    ├── data/
    │   ├── subjects.json       ← Subject & State metadata
    │   └── questions/
    │       ├── math.json           ← गणित (Arithmetic, Reasoning...)
    │       ├── english.json        ← English (Vocab, Grammar...)
    │       ├── hindi.json          ← हिंदी (व्याकरण, साहित्य...)
    │       ├── science.json        ← विज्ञान (Physics, Chemistry...)
    │       ├── gk.json             ← सामान्य ज्ञान (History, Geography...)
    │       ├── computer.json       ← Computer (O Level, CCC, NIELIT...)
    │       ├── sanskrit.json       ← संस्कृत
    │       ├── current_affairs.json← करंट अफेयर्स
    │       └── states_gk.json      ← राज्य GK (UP, MP, Rajasthan...)
    └── index.html              ← Main HTML file (यहीं से app चलता है)
```

---

## ⚡ Setup — Step by Step

### Step 1: Repository Clone करें

```bash
git clone https://github.com/YOUR_USERNAME/vidyasagar.git
cd vidyasagar
```

---

### Step 2: MongoDB Setup

1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) पर जाएं
2. Free account बनाएं → New Project → Create Cluster (Free M0)
3. Database User बनाएं (username + password)
4. Network Access में `0.0.0.0/0` allow करें
5. Connect → Drivers → अपना Connection String copy करें

Connection String ऐसा दिखेगा:
```
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/vidyasagar?retryWrites=true&w=majority
```

---

### Step 3: Backend Setup

```bash
cd backend

# Dependencies install करें
npm install

# .env file बनाएं
copy .env.example .env        # Windows
cp .env.example .env          # Mac/Linux

# .env file खोलें और भरें:
# MONGODB_URI=<आपका MongoDB connection string>
# JWT_SECRET=koi_bhi_random_string_likhein_jaise_abc123xyz
# PORT=5000
# FRONTEND_URL=http://localhost:3000
```

**.env file example:**
```env
PORT=5000
MONGODB_URI=mongodb+srv://rahul:pass123@cluster0.abc.mongodb.net/vidyasagar
JWT_SECRET=vidyasagar_secret_key_2024
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

---

### Step 4: Backend चलाएं

```bash
# Development mode (auto-restart)
npm run dev

# या Production mode
npm start
```

Terminal में दिखेगा:
```
✅ MongoDB से जुड़ गए!
🚀 Server चल रहा है: http://localhost:5000
```

---

### Step 5: Frontend चलाएं

Frontend में कोई build step नहीं है — सीधे `index.html` browser में खोलें।

**Option A — VS Code Live Server (Recommended):**
1. VS Code में [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) install करें
2. `frontend/index.html` open करें
3. नीचे **"Go Live"** button दबाएं
4. Browser में `http://127.0.0.1:5500` खुलेगा

**Option B — Python से:**
```bash
cd frontend
python -m http.server 3000
# Browser में: http://localhost:3000
```

**Option C — Node से:**
```bash
npm install -g serve
cd frontend
serve -p 3000
```

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | नया account बनाएं |
| POST | `/api/auth/login`  | Login करें |
| GET  | `/api/auth/me`     | Profile देखें (Auth required) |
| POST | `/api/history/save`| Quiz result save करें (Auth required) |
| GET  | `/api/history`     | Quiz history देखें (Auth required) |
| DELETE | `/api/history/:id` | Entry delete करें (Auth required) |

**Auth Header:** `Authorization: Bearer <your_jwt_token>`

---

## 📦 Questions कैसे जोड़ें

किसी भी JSON file खोलें और `categories` में नए प्रश्न जोड़ें:

```json
{
  "subject": "गणित",
  "categories": {
    "Arithmetic": [
      {
        "q": "आपका प्रश्न यहाँ लिखें?",
        "opts": ["Option A", "Option B", "Option C", "Option D"],
        "ans": 1
      }
    ]
  }
}
```

> **Note:** `"ans"` में 0-based index लिखें (0=A, 1=B, 2=C, 3=D)

**नया राज्य जोड़ने के लिए** `states_gk.json` खोलें:
```json
{
  "states": {
    "नया राज्य": [
      { "q": "प्रश्न?", "opts": ["A","B","C","D"], "ans": 0 }
    ]
  }
}
```

---

## 🚀 GitHub पर Deploy करें

```bash
# GitHub पर new repository बनाएं: vidyasagar

cd vidyasagar
git init
git add .
git commit -m "🚀 Initial commit - विद्यासागर Quiz App"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/vidyasagar.git
git push -u origin main
```

---

## 🌍 Free Hosting

### Frontend — GitHub Pages
1. GitHub repository → Settings → Pages
2. Source: `Deploy from a branch`
3. Branch: `main` / `frontend` folder
4. Save → URL मिलेगा: `https://username.github.io/vidyasagar`

### Backend — Render.com (Free)
1. [render.com](https://render.com) पर account बनाएं
2. New → Web Service → GitHub repo connect करें
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Environment Variables में `.env` की values डालें
7. Deploy करें → URL मिलेगा

**Frontend में API URL update करें** (`frontend/js/app.js` line 5):
```js
const API_BASE = 'https://your-app.onrender.com/api';
```

---

## 🛠️ Technologies Used

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend  | Node.js, Express.js |
| Database | MongoDB Atlas |
| Auth     | JWT (JSON Web Tokens) |
| Password | bcryptjs |
| Fonts    | Baloo 2, Noto Sans Devanagari |

---

## 📝 Features

- ✅ Login / Signup / Skip (Guest mode)
- ✅ 8 विषय — हर विषय के 3-4 उप-भाग
- ✅ 28 राज्यों की State GK Quiz
- ✅ Computer section — O Level, CCC, NIELIT
- ✅ Lotus loading animation
- ✅ Score tracking + Grade system
- ✅ Quiz history (logged-in users)
- ✅ Timer tracking
- ✅ Shuffle questions
- ✅ Mobile responsive
- ✅ MongoDB data persistence
- ✅ JWT authentication

---

## 🙏 Developer Notes

- **Offline mode:** Internet न हो तो भी app चलेगा — questions JSON files से load होते हैं
- **Guest mode:** Login किए बिना quiz खेल सकते हैं, पर history save नहीं होगी
- **Add questions:** कोई भी JSON file edit करके प्रश्न जोड़ें — server restart की जरूरत नहीं

---

*विद्यासागर — ज्ञान की असीम गहराई 🕉️*
