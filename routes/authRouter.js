var express = require('express');
const User =  require('./../models/permissions/userModel');
const authController =  require('../controllers/authController');
const recruitmentController = require('../controllers/recruitmentController');

var authRouter = express.Router();


authRouter
  .route('/signup')
  .post(authController.signup);
/**
 * @swagger
 * /api/v1/auth/role:
 *  post:
 *      tags:
 *          - Role Management
 *      summary: "Add New Role"
 *      security: [{
 *         bearerAuth: []
 *     }]
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
 *              description: "Role added successfully"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *
 */
  authRouter.route('/role').post(authController.protect,authController.addRole);
  /**
 * @swagger
 * /api/v1/auth/role/{id}:
 *  delete:
 *      tags:
 *          - Role Management
 *      summary: "Delete Role"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Role ID
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
  authRouter.route('/role/:id').delete(authController.protect,authController.deleteRole);
    /**
 * @swagger
 * /api/v1/auth/role/update/{id}:
 *  post:
 *      tags:
 *          - Role Management
 *      summary: "Update Role"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Role ID
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
 *                          Name:
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
  authRouter.route('/role/update/:id').post(authController.protect,authController.updateRole);
   /**
 * @swagger
 * /api/v1/auth/role/{id}:
 *  get:
 *      tags:
 *          - Role Management
 *      summary: "Get Role Based On Id"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Role ID
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
  authRouter.route('/role/:id').get(authController.protect,authController.getRole);
   /**
 * @swagger
 * /api/v1/auth/roles:
 *  get:
 *      tags:
 *          - Role Management
 *      summary: "Get all Role"
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
  authRouter.route('/roles').get(authController.protect,authController.getRoles);
  authRouter.route('/roles/addSubordinate').post(authController.addSubordinate);
  authRouter.route('/roles/getSubordinates/:id').get(authController.getSubordinates);
  authRouter.route('/roles/deleteSubordinate/:userId/:subordinateUserId').delete(authController.deleteSubordinates);
  
//#region User
authRouter.get('/user/:id',recruitmentController.getSkill);
authRouter.get('/user/All',recruitmentController.getAllSkills);
authRouter.post('/user/create',recruitmentController.createSkill);
authRouter.post('/user/update/:id',recruitmentController.updateSkill);
authRouter.delete('/user/delete/:id',recruitmentController.deleteSkill);
  
//#endregion

//#region Permission

authRouter.get('/permission/:id',recruitmentController.getSkill);
authRouter.get('/permission/All',recruitmentController.getAllSkills);
authRouter.post('/permission/create',recruitmentController.createSkill);
authRouter.post('/permission/update/:id',recruitmentController.updateSkill);
authRouter.delete('/permission/delete/:id',recruitmentController.deleteSkill);

//#endregion

//#region UserRole
authRouter.get('/userRole/:id',recruitmentController.getRole);
authRouter.get('/userRoles',recruitmentController.getAllRoles);
authRouter.post('/userRole/create',recruitmentController.createRole);
authRouter.post('/userRole/update/:id',recruitmentController.updateRole);
authRouter.delete('/userRole/delete/:id',recruitmentController.deleteRole);

//#endregion

//#region Role Permission

authRouter.get('/rolePermission/:id',authController.getRolePermission);
authRouter.get('/rolePermissions',authController.getAllRolePermissions);
authRouter.post('/rolePermission/create',authController.createRolePermission);
authRouter.post('/rolePermission/update',authController.updateRolePermission);
authRouter.delete('/rolePermission/delete/:id',authController.deleteRolePermission);

//#endregion


  module.exports = authRouter;


