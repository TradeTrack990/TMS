const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask, startTask, endTask, finishTask, getTasksByUsername } = require('../controllers/taskController');
const upload = require('../middleware/upload');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, isAdmin, createTask);
router.put('/:id', verifyToken, isAdmin, updateTask);
router.delete('/:id', verifyToken, deleteTask);
router.post('/start/:id', verifyToken, upload.array('images', 5), startTask);
router.post('/end/:id', verifyToken, upload.array('images', 5), endTask);
router.post('/finish/:id', verifyToken, isAdmin, finishTask);
router.get('/by-username/:username', verifyToken, getTasksByUsername);
module.exports = router;
