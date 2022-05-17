const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');
const router = express.Router();

// Country Router
router.get('/tasklist',taskController.getTaskList);
router.post('/newtask',taskController.addTask);
router.post('/newtaskusers',taskController.addTaskUser);
router.post('/newtaskattachments',taskController.addTaskAttachment);
router.get('/gettaskuserslist/:id',taskController.getTaskUsers);
router.get('/gettaskattachmentslist/:id',taskController.getTaskAttachments);
router.get('/gettaskuser/:id',taskController.getTaskUser);
router.get('/gettaskattachment/:id',taskController.getTaskAttachment);
router.route('/:id').get(authController.protect,taskController.getTask).patch(taskController.updateTask)
  .delete(taskController.deleteTask);
module.exports = router;