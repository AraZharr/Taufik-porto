const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    maxlength: [100, 'Email must not exceed 100 characters'],
    default: ''
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, 'Phone must not exceed 20 characters'],
    default: ''
  },
  address: {
    type: String,
    trim: true,
    maxlength: [300, 'Address must not exceed 300 characters'],
    default: ''
  },
  github: {
    type: String,
    trim: true,
    maxlength: [200, 'GitHub URL must not exceed 200 characters'],
    default: ''
  },
  linkedin: {
    type: String,
    trim: true,
    maxlength: [200, 'LinkedIn URL must not exceed 200 characters'],
    default: ''
  },
  instagram: {
    type: String,
    trim: true,
    maxlength: [200, 'Instagram URL must not exceed 200 characters'],
    default: ''
  },
  twitter: {
    type: String,
    trim: true,
    maxlength: [200, 'Twitter URL must not exceed 200 characters'],
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

contactSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Contact', contactSchema);
