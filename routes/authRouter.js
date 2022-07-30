var express = require('express');
const User =  require('./../models/userModel');
const authController =  require('../controllers/authController');

var authRouter = express.Router();


authRouter
  .route('/signup')
  .post(authController.signup);

  authRouter.route('/role').post(authController.addRole);
  authRouter.route('/role').delete(authController.deleteRole);
  authRouter.route('/role/update').post(authController.updateRole);
  authRouter.route('/role/:id').get(authController.getRole);
  authRouter.route('/roles').get(authController.getRoles);

  module.exports = authRouter;
