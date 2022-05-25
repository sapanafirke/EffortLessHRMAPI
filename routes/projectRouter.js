const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('../controllers/authController');
const router = express.Router();

// Country Router
router.get('/projectlist',projectController.getProjectList);
//router.patch('/updateCompany',companyController.saveCoutry);
router.post('/newproject',projectController.addProject);
router
  .route('/:id')
  .get(authController.protect,projectController.getProject)
  .patch(   
    projectController.updateProject
  )
  .delete(
    projectController.deleteProject
  );

module.exports = router;