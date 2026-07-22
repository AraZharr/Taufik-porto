const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [2000, 'Description must not exceed 2000 characters'],
    default: 'Write about yourself here...'
  },
  image: {
    type: String,
    default: 'uploads/default-about.png'
  },
  extraInfo: {
    type: String,
    trim: true,
    maxlength: [1000, 'Extra info must not exceed 1000 characters'],
    default: ''
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

aboutSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('About', aboutSchema);
