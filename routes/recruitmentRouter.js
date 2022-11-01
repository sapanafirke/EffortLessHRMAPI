const express = require('express');
const recruitmentController = require('../controllers/recruitmentController');
const router = express.Router();

// export router for express app to use it
module.exports = router;

//#region recruitment

router.get('/skill/:id',recruitmentController.getSkill);
router.get('/skill/All',recruitmentController.getAllSkills);
router.post('/skill/create',recruitmentController.createSkill);
router.post('/skill/update/:id',recruitmentController.updateSkill);
router.post('/skill/delete/:id',recruitmentController.deleteSkill);

//#endregion


//#region role

router.get('/role/:id',recruitmentController.getRole);
router.get('/role/All',recruitmentController.getAllRoles);
router.post('/role/create',recruitmentController.createRole);
router.post('/role/update/:id',recruitmentController.updateRole);
router.post('/role/delete/:id',recruitmentController.deleteRole);

//#endregion


//#region industry

router.get('/industry/:id',recruitmentController.getRole);
router.get('/industry/All',recruitmentController.getAllRoles);
router.post('/industry/create',recruitmentController.createRole);
router.post('/industry/update/:id',recruitmentController.updateRole);
router.post('/industry/delete/:id',recruitmentController.deleteRole);

//#endregion


