const express = require('express');
const companyController = require('../controllers/companyController');
const authController = require('../controllers/authController');
const router = express.Router();

// Country Router
router.get('/companylist',companyController.getCompanyList);
//router.patch('/updateCompany',companyController.saveCoutry);

router
  .route('/:id')
  .get(authController.protect,companyController.getCompany)
  .patch(   
    companyController.updateCompany
  )
  .delete(
    companyController.deleteCompany
  );

module.exports = router;