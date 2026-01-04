const express = require('express');
const router = express.Router();

const auth = require('./auth');
const spaces = require('./spaces');
const files = require('./files');

// Mount routes
router.use('/auth', auth);
router.use('/spaces', spaces);
router.use('/files', files);

module.exports = router;