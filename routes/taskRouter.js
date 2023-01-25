const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const router = express.Router();

// Country Router
/**
 * @swagger
 * /api/v1/task/tasklist:
 *  get:
 *      tags:
 *          - Task Management
 *      summary: "Get all task"
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
router.get('/tasklist',authController.protect,taskController.getTaskList);
/**
 * @swagger
 * /api/v1/task/tasklistbyproject/{projectId}:
 *  get:
 *      tags:
 *          - Task Management
 *      summary: "Get Task List based on ProjectId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: projectId
 *         in: path
 *         description: Project Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
 router.route('/tasklistbyproject/:projectId').get(authController.protect,taskController.getTaskListByProject);
/**
 * @swagger
 * /api/v1/task/{id}:
 *  get:
 *      tags:
 *          - Task Management
 *      summary: "Get Task based on TaskId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
router.route('/:id').get(authController.protect,taskController.getTask);
/**
 * @swagger
 * /api/v1/task/newtask:
 *  post:
 *      tags:
 *          - Task Management
 *      summary: "Create New Task"   
 *      security: [{
 *         bearerAuth: []
 *     }]      
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          taskName:
 *                              type: string
 *                          startDate:
 *                              type: string
 *                              format: date
 *                          endDate:
 *                              type: string
 *                              format: date
 *                          startTime:
 *                              type: string
 *                          description:
 *                              type: string
 *                          comment:
 *                              type: string
 *                          priority:
 *                              type: string
 *                          project:
 *                              type: string
 *                          taskUsers:
 *                              type: array
 *                              items:
 *                                type: string 
 *                          taskAttachments:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: {"attachmentType",attachmentName,attachmentSize,file}                            
 *                          
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
router.post('/newtask',authController.protect,taskController.addTask);
/**
 * @swagger
 * /api/v1/task/update/{id}:
 *  patch:
 *      tags:
 *          - Task Management
 *      summary: "Update Task based on TaskId"   
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *           
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          taskName:
 *                              type: string
 *                          startDate:
 *                              type: string
 *                              format: date
 *                          endDate:
 *                              type: string
 *                              format: date
 *                          startTime:
 *                              type: string
 *                          description:
 *                              type: string
 *                          comment:
 *                              type: string
 *                          priority:
 *                              type: string
 *                          project:
 *                              type: string
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
 router.patch('/update/:id',authController.protect,taskController.updateTask);
/**
 * @swagger
 * /api/v1/task/{id}:
 *  delete:
 *      tags:
 *          - Task Management
 *      summary: "Delete Task based on TaskId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
router.route('/:id').delete(authController.protect,taskController.deleteTask);


/**
 * @swagger
 * /api/v1/task/gettaskuserslist/{id}:
 *  get:
 *      tags:
 *          - Task Management
 *      summary: "Get Task Users based on TaskId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
 router.get('/gettaskuserslist/:id',authController.protect,taskController.getTaskUsers);
/**
 * @swagger
 * /api/v1/task/gettaskuser/{id}:
 *  get:
 *      tags:
 *          - Task Management
 *      summary: "Get a Task User based on TaskUserId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task User Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
 router.get('/gettaskuser/:id',authController.protect,taskController.getTaskUser);
 /**
 * @swagger
 * /api/v1/task/newtaskuser:
 *  post:
 *      tags:
 *          - Task Management
 *      summary: "Apply New User to Task"    
 *      security: [{
 *         bearerAuth: []
 *     }]    
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          taskId:
 *                              type: string
 *                          taskUsers:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: {"user"}
 *                          
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
router.post('/newtaskuser',authController.protect,taskController.addTaskUser);
/**
 * @swagger
 * /api/v1/task/update/taskuser/{id}:
 *  patch:
 *      tags:
 *          - Task Management
 *      summary: "Update Task User based on TaskUserId"   
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task User Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *           
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user:
 *                              type: string  
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
router.patch('/update/taskuser/:id',authController.protect,taskController.updateTaskUser);
/**
 * @swagger
 * /api/v1/task/taskuser/{id}:
 *  delete:
 *      tags:
 *          - Task Management
 *      summary: "Delete Task User Based on TaskUserId"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task User Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
router.route('/taskuser/:id').delete(authController.protect,taskController.deleteTaskUser);


/**
 * @swagger
 * /api/v1/task/gettaskattachmentslist/{id}:
 *  get:
 *      tags:
 *          - Task Management
 *      summary: "Get All Task Attachment based on TaskID"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task ID
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
 router.get('/gettaskattachmentslist/:id',authController.protect,taskController.getTaskAttachments);
 /**
  * @swagger
  * /api/v1/task/gettaskattachment/{id}:
  *  get:
  *      tags:
  *          - Task Management
  *      summary: "Get Task Attachment based on TaskAttachmentId"
  *      security: [{
  *         bearerAuth: []
  *     }]
  *      parameters:
  *       - name: id
  *         in: path
  *         description: Task Attachment Id
  *         required: true
  *         schema:
  *           type: string
  *           format: int64
  *                
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
 router.get('/gettaskattachment/:id',authController.protect,taskController.getTaskAttachment); 
/**
 * @swagger
 * /api/v1/task/new/taskattachment:
 *  post:
 *      tags:
 *          - Task Management
 *      summary: "Create Attachment for Task"  
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          taskId:
 *                              type: string
 *                          taskAttachments:
 *                              type: array
 *                              items:
 *                                type: string
 *                                example: {"attachmentType",attachmentName,attachmentSize,file}
 *                          
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
router.post('/new/taskattachment',authController.protect,taskController.addTaskAttachment);
/**
 * @swagger
 * /api/v1/task/update/taskattachemnt/{id}:
 *  patch:
 *      tags:
 *          - Task Management
 *      summary: "Update Task Attachement based on TaskAttachmentId"   
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task Attachment Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *           
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          file:
 *                              type: string
 *                          attachmentType:
 *                              type: string  
 *                          attachmentName:
 *                              type: string  
 *                          attachmentSize:
 *                              type: string
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
router.patch('/update/taskattachemnt/:id',authController.protect,taskController.updateTaskAttachments);
 /**
 * @swagger
 * /api/v1/task/taskattachment/{id}:
 *  delete:
 *      tags:
 *          - Task Management
 *      summary: "Delete Task Attachment"
 *      security: [{
 *         bearerAuth: []
 *     }]
 *      parameters:
 *       - name: id
 *         in: path
 *         description: Task Attachment Id
 *         required: true
 *         schema:
 *           type: string
 *           format: int64
 *                
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
 router.route('/taskattachment/:id').delete(authController.protect,taskController.deleteTaskAttachment);

 /**
 * @swagger
 * /api/v1/task/tasklistbyuser:
 *  post:
 *      tags:
 *          - Task Management
 *      summary: "Get Task List By UserId"   
 *      security: [{
 *         bearerAuth: []
 *     }]
 *           
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userId:
 *                              type: string  
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
  router.post('/tasklistbyuser',authController.protect,taskController.getTaskListByUser);

module.exports = router;