var express = require('express');
const User =  require('./../models/permissions/userModel');
const authController =  require('../controllers/authController');
const recruitmentController = require('../controllers/recruitmentController');
const commonController =  require('../controllers/commonController');
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
 *      summary: "Create Role"
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
 *      summary: "Delete Role Based on Id"
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
 *      summary: "Update Role based on RoleId"
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
/**
 * @swagger
 * /api/v1/auth/permission/{id}:
 *  get:
 *      tags:
 *          - Permission Management
 *      summary: "Get Permission Based On Id"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Permission ID
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
authRouter.get('/permission/:id',authController.protect,commonController.getPermission);
/**
 * @swagger
 * /api/v1/auth/permissions:
 *  get:
 *      tags:
 *          - Permission Management
 *      summary: "Get all Permission"
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
authRouter.get('/permissions',authController.protect,commonController.getPermissionList);
/**
 * @swagger
 * /api/v1/auth/permission/create:
 *  post:
 *      tags:
 *          - Permission Management
 *      summary: "Create Permission"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          permissionName:
 *                              type: string
 *                          permissionDetails:
 *                              type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Permission added successfully"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *
 */
authRouter.post('/permission/create',authController.protect,commonController.savePermission);
/**
 * @swagger
 * /api/v1/auth/permission/update/{id}:
 *  post:
 *      tags:
 *          - Permission Management
 *      summary: "Update Permission based on PermissionId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Permission ID
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
 *                          permissionName:
 *                              type: string
 *                          permissionDetails:
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
authRouter.post('/permission/update/:id',authController.protect,commonController.updatePermission);
/**
 * @swagger
 * /api/v1/auth//permission/delete/{id}:
 *  delete:
 *      tags:
 *          - Permission Management
 *      summary: "Delete Permission Based on Id"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Permission ID
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
authRouter.delete('/permission/delete/:id',authController.protect,commonController.deletePermission);

//#endregion

//#region UserRole
authRouter.get('/userRole/:id',recruitmentController.getRole);
authRouter.get('/userRoles',recruitmentController.getAllRoles);
authRouter.post('/userRole/create',recruitmentController.createRole);
authRouter.post('/userRole/update/:id',recruitmentController.updateRole);
authRouter.delete('/userRole/delete/:id',recruitmentController.deleteRole);

//#endregion

//#region Role Permission
/**
 * @swagger
 * /api/v1/auth/rolePermission/{id}:
 *  get:
 *      tags:
 *          - Role Permission Management
 *      summary: "Get Role Permission Based On Role Permission Id"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Role Permission ID
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
authRouter.get('/rolePermission/:id',authController.protect,authController.getRolePermission);
/**
 * @swagger
 * /api/v1/auth/rolePermissions:
 *  get:
 *      tags:
 *          - Role Permission Management
 *      summary: "Get all Permission"
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
authRouter.get('/rolePermissions',authController.protect,authController.getAllRolePermissions);
/**
 * @swagger
 * /api/v1/auth/rolePermission/create:
 *  post:
 *      tags:
 *          - Role Permission Management
 *      summary: "Create Role Permission"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          roleId:
 *                              type: string
 *                          permissionId:
 *                              type: string
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Role Permission added successfully"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *
 */
authRouter.post('/rolePermission/create',authController.protect,authController.createRolePermission);
/**
 * @swagger
 * /api/v1/auth/rolePermission/update/{id}:
 *  post:
 *      tags:
 *          - Role Permission Management
 *      summary: "Update Role Permission based on RolePermissionId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Role Permission ID
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
 *                          roleId:
 *                              type: string
 *                          permissionId:
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
authRouter.post('/rolePermission/update/:id',authController.protect,authController.updateRolePermission);
/**
 * @swagger
 * /api/v1/auth/rolePermission/delete/{id}:
 *  delete:
 *      tags:
 *          - Role Permission Management
 *      summary: "Delete Role Permission Based on Id"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Role Permission ID
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
authRouter.delete('/rolePermission/delete/:id',authController.protect,authController.deleteRolePermission);

//#endregion


  module.exports = authRouter;


