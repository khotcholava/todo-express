const express = require('express')
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getTodoList, createTodo, updateTodo } = require('../controllers/todoController');

router.get('/list', verifyToken, getTodoList)
router.post('/create', verifyToken, createTodo)
router.put('/update/:id', verifyToken, updateTodo)


module.exports = router