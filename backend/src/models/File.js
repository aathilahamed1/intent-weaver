const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'File name is required'],
    trim: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: [true, 'File path is required'],
  },
  size: {
    type: Number,
    required: [true, 'File size is required'],
    min: [0, 'File size cannot be negative'],
  },
  mimeType: {
    type: String,
    required: [true, 'MIME type is required'],
  },
  tags: [{
    type: String,
    enum: ['study', 'coa', 'os', 'maths', 'programming', 'python', 'c', 'pdf', 'recent', 'cooking', 'important'],
  }],
  space: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Space',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
  lastOpened: {
    type: Date,
  },
  type: {
    type: String,
    enum: ['file', 'folder'],
    default: 'file',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt on save
fileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
fileSchema.index({ user: 1, space: 1 });
fileSchema.index({ user: 1, tags: 1 });
fileSchema.index({ user: 1, name: 1 });
fileSchema.index({ user: 1, lastOpened: -1 });

module.exports = mongoose.model('File', fileSchema);