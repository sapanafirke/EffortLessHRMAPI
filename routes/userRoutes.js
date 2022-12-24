const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

// Auth routes
/**
 * @swagger
 * /api/v1/users/signup:
 *  post:
 *      tags:
 *          - Registration
 *      summary: "Register New User"   
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          passwordConfirm:
 *                              type: string
 *                          role:
 *                              type: string
 *                          companyId:
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
router.post('/signup', authController.signup);
/**
 * @swagger
 * /api/v1/users/login:
 *  post:
 *      tags:
 *          - Authorization
 *      summary: "Returns Authorization Token"
 *      description: "Authorizes default users with username and password set as root to use the endpoints"

 *      requestBody:
 *          content:
 *              application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *              
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Authorization token"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *
 */
router.post('/login', authController.login);
router.get('/getUsersByCompany',authController.protect,userController.getUsersByCompany);
router.post('/getusers',userController.getUsers);
  /**
 * @swagger
 * /api/v1/users/forgotPassword:
 *  post:
 *      tags:
 *          - Registration
 *      summary: "forgot Password"   
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:                   
 *                          email:
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
router.post('/forgotPassword', authController.forgotPassword);
 /**
 * @swagger
 * /api/v1/users/resetPassword/{token}:
 *  patch:
 *      tags:
 *          - Registration
 *      summary: "Reset Password"   
 *      parameters:
 *       - name: token
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
 *                          password:
 *                              type: string
 *                          passwordConfirm:
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
router.patch('/resetPassword/:token', authController.resetPassword);
/**
 * @swagger
 * /api/v1/users/inviteUser:
 *  post:
 *      tags:
 *          - Registration
 *      summary: "Invite User"   
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          passwordConfirm:
 *                              type: string
 *                          role:
 *                              type: string
 *                          phone:
 *                               type:string
 *                          companyId:
 *                              type: string
 *                          createdBy:
 *                               type:string
 *                          updatedBy:
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
router.post('/inviteUser', authController.CreateUser);
router.patch(
  '/updateMyPassword',  
  authController.updatePassword
);
router.patch(
  '/updateUserbyinvitation',  
  authController.updateUserbyinvitation
);

// Protect all routes from now on
//router.use(authController.protect);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// Only admins are able to use routes below
//router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);
    


module.exports = router;