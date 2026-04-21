const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    roll:         { type: String, required: true, trim: true },
    year:         { type: String, required: true },
    degree:       { type: String, required: true },
    role:         { type: String, required: true },
    email:        { type: String, required: true, trim: true },
    project:      { type: String, trim: true },
    hobbies:      { type: String, trim: true },
    certificate:  { type: String, trim: true },
    internship:   { type: String, trim: true },
    aboutYourAim: { type: String, trim: true },
    image:        { type: String, default: null },   // uploaded filename
    imageUrl:     { type: String, default: null },   // external fallback
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', memberSchema);
