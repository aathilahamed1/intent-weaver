const Space = require('../models/Space');
const File = require('../models/File');

// @desc    Get all spaces for user
// @route   GET /api/spaces
// @access  Private
const getSpaces = async (req, res, next) => {
  try {
    const spaces = await Space.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: spaces.length,
      data: spaces,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single space
// @route   GET /api/spaces/:id
// @access  Private
const getSpace = async (req, res, next) => {
  try {
    const space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found',
      });
    }

    // Make sure user owns space
    if (space.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this space',
      });
    }

    res.status(200).json({
      success: true,
      data: space,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new space
// @route   POST /api/spaces
// @access  Private
const createSpace = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const space = await Space.create(req.body);

    res.status(201).json({
      success: true,
      data: space,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update space
// @route   PUT /api/spaces/:id
// @access  Private
const updateSpace = async (req, res, next) => {
  try {
    let space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found',
      });
    }

    // Make sure user owns space
    if (space.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this space',
      });
    }

    space = await Space.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: space,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete space
// @route   DELETE /api/spaces/:id
// @access  Private
const deleteSpace = async (req, res, next) => {
  try {
    const space = await Space.findById(req.params.id);

    if (!space) {
      return res.status(404).json({
        success: false,
        message: 'Space not found',
      });
    }

    // Make sure user owns space
    if (space.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this space',
      });
    }

    // Delete all files in the space
    await File.deleteMany({ space: req.params.id });

    await space.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSpaces,
  getSpace,
  createSpace,
  updateSpace,
  deleteSpace,
};