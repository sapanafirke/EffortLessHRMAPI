const express = require('express');
const userPreferencesController = require('./../controllers/userPreferencesController');
const router = express.Router();
module.exports = router;

// User Preferences routes
/**
 * @swagger
 * /api/v1/userPreferences/getAll:
 *  get:
 *      tags:
 *          - GetUserPreferences
 *      summary: "Get All User Preferences"   
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
router.get('/getAll', userPreferencesController.getAllUserPreference);
/**
 * @swagger
 * /api/v1/userPreferences/get/{id}:
 *  get:
 *      tags:
 *          - GetUserPreferences
 *      summary: "Get User Preference by ID"  
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
router.get('/get/:id', userPreferencesController.getUserPreference);

// User Preferences routes
/**
 * @swagger
 * /api/v1/userPreferences/create:
 *  post:
 *      tags:
 *          - CreateUserPreference
 *      summary: "Create User Preferences"
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
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
router.post('/create', userPreferencesController.createUserPreference);

/**
 * @swagger
 * /api/v1/userPreferences/delete/{id}:
 *  delete:
 *      tags:
 *          - DeleteUserPreferences
 *      summary: "Delete User Preference by ID"  
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
router.delete('/delete/:id', userPreferencesController.deleteUserPreference);

// User Preferences routes
/**
 * @swagger
 * /api/v1/userPreferences/update/{id}:
 *  patch:
 *      tags:
 *          - UpdateUserPreference
 *      summary: "Update User Preferences"
 * 
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
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
router.patch('/update/:id', userPreferencesController.updateUserPreference);