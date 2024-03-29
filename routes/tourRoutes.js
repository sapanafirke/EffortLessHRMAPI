const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// Use different router on this specific path
router.use('/:tourId/reviews', reviewRouter);

// Pre defined route, it adds query to url
router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

// Get tours stats using aggregation
router.route('/tour-stats').get(tourController.getTourStats);

// Get monthly tour plan using aggregation
router
  .route('/monthly-plan/:year')
  .get(    
    tourController.getMonthlyPlan
  );

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourController.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourController.getDistances);

router
  // on this route
  .route('/tours')
  // use this controllers
  .get(()=> console.log('get all tours'))
  .post(tourController.createTour);

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(   
    tourController.updateTour
  )
  .delete(
    tourController.deleteTour
  );

// export router for express app to use it
module.exports = router;
