const express = require('express');
const router = express.Router();

// import the handling functions from the controller:
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

// import the auth middleware to protect private routes:
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getTodos);

router.post('/', protect, createTodo);

router.put('/:id', protect, updateTodo);

router.delete('/:id', protect, deleteTodo);

module.exports = router;