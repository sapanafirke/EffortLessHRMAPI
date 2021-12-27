var express = require('express');
const User =  require('./../models/userModel');
const authController =  require('../controllers/authController');

var authRouter = express.Router();
//router.post('/signup',authController.signup);

authRouter
  .route('/signup')
  .post(authController.signup);

  module.exports = authRouter;