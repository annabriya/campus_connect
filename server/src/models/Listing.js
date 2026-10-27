const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
  description: { type: String, required: true, trim: true, minlength: 10, maxlength: 1500 },
  category: { type: String, required: true, enum: ['Event', 'Workshop', 'Internship', 'Competition', 'Volunteer'] },
  location: { type: String, required: true, trim: true, maxlength: 120 },
  date: { type: Date, required: true },
  organizer: { type: String, required: true, trim: true, maxlength: 100 },
  link: { type: String, trim: true, maxlength: 500, default: '' }
}, { timestamps: true });
module.exports = mongoose.model('Listing', schema);
