const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleTr: { type: String, required: true },
  titleEn: { type: String, required: true },
  description: { type: String, required: true },
  descriptionTr: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  category: { type: String, required: true },
  categoryTr: { type: String, required: true },
  categoryEn: { type: String, required: true },
  images: [{ type: String }],
  technologies: [{ type: String }],
  projectUrl: { type: String },
  order: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Portfolio', portfolioSchema); 