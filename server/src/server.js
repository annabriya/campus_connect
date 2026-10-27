require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const listingRoutes = require('./routes/listings');
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected', app: 'CampusConnect API' }));
app.use('/api/listings', listingRoutes);
app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` }));
app.use((err, _req, res, _next) => { console.error('API error:', err.message); res.status(err.status || 500).json({ message: err.status ? err.message : 'Something went wrong on the server.' }); });
async function start() {
  if (process.env.MONGO_URI && process.env.MONGO_URI !== 'your_mongodb_connection_string_here') {
    try { await mongoose.connect(process.env.MONGO_URI); console.log('MongoDB connected successfully'); }
    catch (e) { console.error('MongoDB connection failed:', e.message); process.exit(1); }
  } else console.warn('MONGO_URI is not configured. Add it to server/.env before using database routes.');
  app.listen(PORT, () => console.log(`CampusConnect API running at http://localhost:${PORT}`));
}
start();
