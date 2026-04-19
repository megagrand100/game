require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes    = require('./routes/auth');
const historyRoutes = require('./routes/history');

const app  = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARE ───
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── ROUTES ───
app.use('/api/auth',    authRoutes);
app.use('/api/history', historyRoutes);

app.get('/', (req, res) => {
  res.json({ message: '📚 विद्यासागर API चालू है!', status: 'OK' });
});

// ─── ERROR HANDLER ───
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error' });
});

// ─── MONGODB CONNECTION ───
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB से जुड़ गए!');
    app.listen(PORT, () => console.log(`🚀 Server चल रहा है: http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  });
