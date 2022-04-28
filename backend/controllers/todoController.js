const asyncHandler = require('express-async-handler');

const Todo = require('../models/todoModel');
const User = require('../models/userModel');

// description: get to-dos
// route: GET /api/todos
// access: private
const getTodos = asyncHandler(async (req, res) => {
  // authMiddleware.js sets the user object to req.user
  // user is a key to each to-do item, user._id being the value:
  const todos = await Todo.find({ user: req.user.id });
  res.status(200).json(todos);
});

// description: create to-do
// route: POST /api/todos
// access: private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('please add the required field(s)');
  }

  // place a limit of 250 to-do items total in the database
  // to keep it at a demo size:
  const maxedOut = await Todo.count();
  if (maxedOut >= 250) {
    res.status(400);
    throw new Error('to-dos are at capacity');
  }

  const todo = await Todo.create({
    title: req.body.title,
    notes: req.body.notes ? req.body.notes : '',
    dueDate: req.body.dueDate ? req.body.dueDate : null,
    list: req.body.list ? req.body.list : null,
    // req.user.id is taken from the login token:
    user: req.user.id,
  });
  res.status(200).json(todo);
});

// description: update to-do
// route: PUT /api/todos/:id
// access: private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('to-do not found');
  }

  // authMiddleware.js sets the user object to req.user
  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }

  // verify that the logged in user matches the to-do's user:
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTodo);
});

// description: delete to-do
// route: DELETE /api/todos/:id
// access: private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error('to-do not found');
  }

  // authMiddleware.js sets the user object to req.user
  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }

  // verify that the logged in user matches the to-do's user:
  if (todo.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  await todo.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
