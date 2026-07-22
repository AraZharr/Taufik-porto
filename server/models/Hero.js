const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: [true, 'Heading is required'],
    trim: true,
    maxlength: [100, 'Heading must not exceed 100 characters'],
    default: 'Hello, I am'
  },
  subheading: {
    type: String,
    required: [true, 'Subheading is required'],
    trim: true,
    maxlength: [200, 'Subheading must not exceed 200 characters'],
    default: 'Full Stack Developer'
  },
  ctaText: {
    type: String,
    trim: true,
    maxlength: [50, 'CTA text must not exceed 50 characters'],
    default: 'View My Work'
  },
  ctaLink: {
    type: String,
    trim: true,
    maxlength: [200, 'CTA link must not exceed 200 characters'],
    default: '#portfolio'
  },
  profileImage: {
    type: String,
    default: 'uploads/default-avatar.png'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

heroSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Hero', heroSchema);
