const express = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const router = express.Router();

// Auth routes
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
  
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);
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