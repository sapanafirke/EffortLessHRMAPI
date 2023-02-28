const express = require('express');
const errorLogController = require('../controllers/errorLogController');
const leaveController = require('../controllers/leaveController');
const authController = require('../controllers/authController');
const router = express.Router();

// Error Log Router
/**
 * @swagger
 * /api/v1/leave/leavelist:
 *  get:
 *      tags:
 *          - Leave Management
 *      summary: "Get all Leaves"
 *      security: [{
 *         bearerAuth: []
 *     }]
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

router.get('/leavelist',authController.protect,leaveController.getLeaveList);

/**
 * @swagger
 * /api/v1/leave/leavelist/{userId}:
 *  get:
 *      tags:
 *          - Leave Management
 *      summary: "Get all Leave"
 *      security: [{
 *         bearerAuth: []
 *     }] 
 *      parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
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

router.get('/leavelist/:userId',authController.protect,leaveController.getLeaveByUser);
/**
 * @swagger
 * /api/v1/leave/new:
 *  post:
 *      tags:
 *          - Leave Management
 *      summary: "Apply Leave"   
 *      security: [{
 *         bearerAuth: []
 *     }]      
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: string
 *                          LeaveType:
 *                              type: string
 *                          Note:
 *                              type: string
 *                          Date:
 *                              type: string
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
router.post('/new',authController.protect,leaveController.saveLeave);

/**
 * @swagger
 * /api/v1/leave/{id}:
 *  get:
 *      tags:
 *          - Leave Management
 *      summary: "Get Leave based on LeaveId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Leave Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
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
 router.get('/:id',authController.protect,leaveController.getLeave);
 /**
  * @swagger
  * /api/v1/leave/{id}:
  *  patch:
  *      tags:
  *          - Leave Management
  *      summary: "Update Leave based on LeaveId"   
  *      security: [{
  *         bearerAuth: []
  *     }]
  *      parameters:
  *       - name: id
  *         in: path
  *         description: Leave Id
  *         required: true
  *         schema:
  *           type: string
  *           format: int64
  *           
  *      requestBody:
  *          content:
  *              application/json:
  *                  schema:
  *                      type: object
  *                      properties:
  *                          user:
  *                              type: string
  *                          LeaveType:
  *                              type: string
  *                          Note:
  *                              type: string
  *                          Date:
  *                              type: string
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
 router.patch('/:id',authController.protect,leaveController.updateLeave);
 /**
  * @swagger
  * /api/v1/leave/{id}:
  *  delete:
  *      tags:
  *          - Leave Management
  *      summary: "Delete Leave based on Leave Id"   
  *      security: [{
  *         bearerAuth: []
  *     }]
  *      parameters:
  *       - name: id
  *         in: path
  *         description: Leave Id
  *         required: true
  *         schema:
  *           type: string
  *           format: int64
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
 router.delete('/:id',authController.protect,leaveController.deleteLeave);


module.exports = router;