const File = require('../models/File');
const Space = require('../models/Space');
const path = require('path');
const fs = require('fs').promises;

// @desc    Get files for a space
// @route   GET /api/files?space=:spaceId
// @access  Private
const getFiles = async (req, res, next) => {
  try {
    const { space, tags, search, limit = 50, page = 1 } = req.query;

    // Build query
    let query = { user: req.user.id };

    if (space) {
      query.space = space;
    }

    if (tags) {
      const tagArray = tags.split(',');
      query.tags = { $in: tagArray };
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const files = await File.find(query)
      .populate('space', 'name')
      .sort({ lastOpened: -1, createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await File.countDocuments(query);

    res.status(200).json({
      success: true,
      count: files.length,
      total,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit)),
      },
      data: files,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single file
// @route   GET /api/files/:id
// @access  Private
const getFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id).populate('space', 'name');

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Make sure user owns file
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this file',
      });
    }

    // Update last opened
    file.lastOpened = new Date();
    await file.save();

    res.status(200).json({
      success: true,
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload file
// @route   POST /api/files
// @access  Private
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    const { spaceId, tags } = req.body;

    // Check if space exists and belongs to user
    const space = await Space.findOne({ _id: spaceId, user: req.user.id });
    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found',
      });
    }

    const fileData = {
      name: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      mimeType: req.file.mimetype,
      space: spaceId,
      user: req.user.id,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
    };

    const file = await File.create(fileData);

    // Update space file count
    await Space.findByIdAndUpdate(spaceId, { $inc: { fileCount: 1 } });

    res.status(201).json({
      success: true,
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update file
// @route   PUT /api/files/:id
// @access  Private
const updateFile = async (req, res, next) => {
  try {
    let file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Make sure user owns file
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this file',
      });
    }

    file = await File.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: file,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete file
// @route   DELETE /api/files/:id
// @access  Private
const deleteFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Make sure user owns file
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this file',
      });
    }

    // Delete file from filesystem
    try {
      await fs.unlink(file.path);
    } catch (fsError) {
      console.warn('Failed to delete file from filesystem:', fsError);
    }

    // Update space file count
    await Space.findByIdAndUpdate(file.space, { $inc: { fileCount: -1 } });

    await file.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Download file
// @route   GET /api/files/:id/download
// @access  Private
const downloadFile = async (req, res, next) => {
  try {
    const file = await File.findById(req.params.id);

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Make sure user owns file
    if (file.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this file',
      });
    }

    res.download(file.path, file.originalName);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFiles,
  getFile,
  uploadFile,
  updateFile,
  deleteFile,
  downloadFile,
};