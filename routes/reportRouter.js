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
/**
 * @swagger
 * /api/v1/report/getproductivitybymember:
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
 *                         user:
 *                              type: string                             
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
 router.post('/getproductivitybymember', authController.protect, reportController.getProductivityByMember);

 /**
 * @swagger
 * /api/v1/report/getproductivity:
 *  post:
 *      tags:
 *          - Report Management
 *      summary: "Get Productivity for all members"   
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
  router.post('/getproductivity', authController.protect, reportController.getProductivity);
/**
 * @swagger
 * /api/v1/report/getappwebsite:
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
 router.post('/getappwebsite', authController.protect, reportController.getAppWebsite);
 module.exports = router;