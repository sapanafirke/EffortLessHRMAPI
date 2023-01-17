var express = require('express');
const authController = require('./../controllers/authController');
const cron = require("node-cron");
var routes = express();
app = express();
routes.get('/', (req, res, next) => {
  res.render('welcome');
})



//#region Permission
/**
 * @swagger
 * /api/v1/auth/permission:
 *  get:
 *      tags:
 *          - Management
 *      summary: "Dummy"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      produces:
 *          - application/json
 *      responses:
 *          200:
 *              description: "Success"
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *
 */
/*app.get('/dynamic_view', function(req, res){
  res.render('home', {
     name: "TutorialsPoint", 
     message:"http://www.tutorialspoint.com"
  });
});*/
/*
var task = cron.schedule('* * * * *', () =>  {
authController.sendLog();
  }, {
    scheduled: true
   // timezone: "America/Sao_Paulo"
  });
  
  task.start();*/  

module.exports = routes;