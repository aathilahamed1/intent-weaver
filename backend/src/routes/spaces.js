const express = require('express');
const {
  getSpaces,
  getSpace,
  createSpace,
  updateSpace,
  deleteSpace,
} = require('../controllers/spaceController');

const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Space:
 *       type: object
 *       required:
 *         - name
 *         - tags
 *         - icon
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         icon:
 *           type: string
 *         isDefault:
 *           type: boolean
 *         fileCount:
 *           type: number
 *         user:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/spaces:
 *   get:
 *     summary: Get all spaces for user
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of spaces retrieved
 */
router.get('/', auth, getSpaces);

/**
 * @swagger
 * /api/spaces:
 *   post:
 *     summary: Create a new space
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Space'
 *     responses:
 *       201:
 *         description: Space created successfully
 */
router.post('/', auth, createSpace);

/**
 * @swagger
 * /api/spaces/{id}:
 *   get:
 *     summary: Get a space by ID
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Space retrieved successfully
 */
router.get('/:id', auth, getSpace);

/**
 * @swagger
 * /api/spaces/{id}:
 *   put:
 *     summary: Update a space
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Space'
 *     responses:
 *       200:
 *         description: Space updated successfully
 */
router.put('/:id', auth, updateSpace);

/**
 * @swagger
 * /api/spaces/{id}:
 *   delete:
 *     summary: Delete a space
 *     tags: [Spaces]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Space deleted successfully
 */
router.delete('/:id', auth, deleteSpace);

module.exports = router;