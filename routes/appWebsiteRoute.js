const appWebsiteController = require('./../controllers/appWebsiteController');
const express = require('express');
const { Router } = require('express');
const app = require('../app');
const router = express.Router();
module.exports = router;


//App Website Routes
/**
 * @swagger
 * /api/v1/appWebsite/create:
 *  post:
 *      tags:
 *          - App Website Management
 *      summary: "Create App Website Data"   
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
  *                      properties:
 *                          appWebsite:
 *                              type: string
 *                          ModuleName:
 *                              type: string
 *                          ApplicationTitle:
 *                              type: string
 *                          TimeSpent:
 *                              type: string
 *                          date:
 *                              type: string
 *                          type:
 *                              type: string
 *                          projectReference:
 *                              type: string
 *                          userReference:
 *                              type: string
 *                          mouseClicks:
 *                              type: string
 *                          keyboardStrokes:
 *                              type: string
 *                          scrollingNumber:
 *                              type: string
 *                          inactive:
 *                              type: string
 *                          total:
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
 * 
 */
router.post('/create', appWebsiteController.addNew);

/**
 * @swagger
 * /api/v1/appWebsite/delete/{id}:
 *  delete:
 *      tags:
 *          - App Website Management
 *      summary: "Delete by ID"  
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Id
 *         required: true
 *         schema:
 *           type: string 
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
router.delete('/delete/:id', appWebsiteController.delete);

/**
 * @swagger
 * /api/v1/appWebsite/get/{id}:
 *  get:
 *      tags:
 *          - App Website Management
 *      summary: "Get ID"  
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Id
 *         required: true
 *         schema:
 *           type: string 
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

router.get('/get/:id', appWebsiteController.getById);

// User Preferences routes
/**
 * @swagger
 * /api/v1/appWebsite/update/{id}:
 *  patch:
 *      tags:
 *          - App Website Management
 *      summary: "Update"
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          appWebsite:
 *                              type: string
 *                          ModuleName:
 *                              type: string
 *                          ApplicationTitle:
 *                              type: string
 *                          TimeSpent:
 *                              type: string
 *                          date:
 *                              type: string
 *                          type:
 *                              type: string
 *                          projectReference:
 *                              type: string
 *                          userReference:
 *                              type: string
 *                          mouseClicks:
 *                              type: string
 *                          keyboardStrokes:
 *                              type: string
 *                          scrollingNumber:
 *                              type: string
 *                          inactive:
 *                              type: string
 *                          total:
 *                              type: string
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Id
 *         required: true
 *         schema:
 *           type: string 
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

router.patch('/update/:id', appWebsiteController.update);


router.get('/getByIdandDate/:id', appWebsiteController.getByIdAndDate);

router.get('/getAll', appWebsiteController.getAllbyDate);

