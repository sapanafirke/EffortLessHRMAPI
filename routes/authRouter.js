var express = require('express');
const User =  require('./../models/permissions/userModel');
const authController =  require('../controllers/authController');
const recruitmentController = require('../controllers/recruitmentController');

var authRouter = express.Router();


authRouter
  .route('/signup')
  .post(authController.signup);

  authRouter.route('/role').post(authController.addRole);
  authRouter.route('/role').delete(authController.deleteRole);
  authRouter.route('/role/update').post(authController.updateRole);
  authRouter.route('/role/:id').get(authController.getRole);
  authRouter.route('/roles').get(authController.getRoles);
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
authRouter.get('/userRole/All',recruitmentController.getAllRoles);
authRouter.post('/userRole/create',recruitmentController.createRole);
authRouter.post('/userRole/update/:id',recruitmentController.updateSkill);
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


