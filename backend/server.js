const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ── Routes ────────────────────────────────────────────────────────
const memberRoutes = require('./routes/members');
app.use('/api/members', memberRoutes);
app.use('/members', memberRoutes); // backward-compat alias

// Health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    team: 'Birds in the TRAP',
    message: 'API is live 🔥'
  });
});

// ── Connect DB then start ─────────────────────────────────────────
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://localhost:27017/birdsinthetrap';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
