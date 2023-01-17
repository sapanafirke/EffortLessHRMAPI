const users = require('./../controllers/userController');
const express = require('express');
const router = express.Router();
const app = require('../app');
module.exports = router;


router.get('/getall', users.getAllUsers);