const express = require('express');
const holidayCalendarController = require('../controllers/holidayCalendarController');
const authController = require('../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect,holidayCalendarController.getHolidayCalendar)  
  .post(authController.protect,holidayCalendarController.saveHolidayCalendar); 

  router.get('/holidayList', authController.protect, holidayCalendarController.getHolidayList);
  
module.exports = router;