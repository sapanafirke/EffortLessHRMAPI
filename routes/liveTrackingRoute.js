const express = require('express');
const { Router } = require('express');
const app = require('../app');
const router = express.Router();
module.exports = router;
const liveTrackingController = require('../controllers/liveTrackingController')

// Create
/**
 * @swagger
 * /api/v1/liveTracking/save:
 *   post:
 *     tags:
 *       - Live Tracking
 *     summary: Create a new live tracking entry
 *     requestBody:
 *       content:
 *         application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fileString:
 *                              type: string
 *     responses:
 *       200:
 *         description: Successfully created a live tracking entry
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

router.post('/save', liveTrackingController.addOrUpdateIfExists);

// Read by ID
/**
 * @swagger
 * /api/v1/liveTracking/getByUserId/{userId}:
 *   get:
 *     tags:
 *       - Live Tracking
 *     summary: Get a live tracking entry by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: UserId of the live tracking entry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the live tracking entry
 *       404:
 *         description: Live tracking entry not found
 *       500:
 *         description: Internal server error
 */
router.get('/getByUserId/:userId', liveTrackingController.getByUserId);
