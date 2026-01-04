const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Space name is required'],
    trim: true,
    maxlength: [100, 'Space name cannot exceed 100 characters'],
  },
  tags: [{
    type: String,
    enum: ['study', 'coa', 'os', 'maths', 'programming', 'python', 'c', 'pdf', 'recent', 'cooking', 'important'],
    required: true,
  }],
  icon: {
    type: String,
    required: [true, 'Icon is required'],
    trim: true,
  },
  isDefault: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  fileCount: {
    type: Number,
    default: 0,
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
spaceSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
spaceSchema.index({ user: 1, name: 1 });
spaceSchema.index({ user: 1, tags: 1 });

module.exports = mongoose.model('Space', spaceSchema);