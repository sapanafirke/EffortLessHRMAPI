const express = require('express');
const reportController = require('../controllers/reportController');
const authController = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/v1/report/getactivity:
 *  post:
 *      tags:
 *          - Report Management
 *      summary: "Get Activity"   
 *      security: [{
 *         bearerAuth: []
 *     }]    
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                         users:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: ""
 *                         projects:
 *                              type: array
 *                              items:
 *                                type: object
 *                                example: ""
 *                         tasks:
  *                              type: array
 *                              items:
 *                                type: object
 *                                example: ""
 *                         fromdate:
 *                              type: string
 *                              format: date
 *                         todate:
 *                              type: string
 *                              format: date
 *     
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *
 */
router.post('/getactivity', authController.protect, reportController.getActivity);


 module.exports = router;