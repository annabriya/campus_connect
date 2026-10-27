const express = require('express');
const mongoose = require('mongoose');
const Listing = require('../models/Listing');
const router = express.Router();
const categories = ['Event', 'Workshop', 'Internship', 'Competition', 'Volunteer'];
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category && categories.includes(req.query.category)) filter.category = req.query.category;
    if (req.query.search) {
      const q = String(req.query.search).trim().slice(0, 100);
      filter.$or = ['title', 'description', 'location', 'organizer'].map(field => ({ [field]: { $regex: q, $options: 'i' } }));
    }
    res.json(await Listing.find(filter).sort({ date: 1, createdAt: -1 }).limit(200));
  } catch (e) { next(e); }
});
router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid listing ID.' });
    const item = await Listing.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Listing not found.' });
    res.json(item);
  } catch (e) { next(e); }
});
router.post('/', async (req, res, next) => {
  try {
    const { title, description, category, location, date, organizer, link = '' } = req.body;
    if (!title || !description || !category || !location || !date || !organizer) return res.status(400).json({ message: 'Please fill in all required fields.' });
    if (!categories.includes(category)) return res.status(400).json({ message: 'Choose a valid category.' });
    if (Number.isNaN(Date.parse(date))) return res.status(400).json({ message: 'Enter a valid date.' });
    if (link && !/^https?:\/\/.+/i.test(link)) return res.status(400).json({ message: 'Link must begin with http:// or https://.' });
    res.status(201).json(await Listing.create({ title, description, category, location, date, organizer, link }));
  } catch (e) { if (e.name === 'ValidationError') return res.status(400).json({ message: e.message }); next(e); }
});
router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid listing ID.' });
    const item = await Listing.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Listing not found.' });
    res.json({ message: 'Listing deleted successfully.' });
  } catch (e) { next(e); }
});
module.exports = router;
