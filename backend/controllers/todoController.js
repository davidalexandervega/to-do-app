const asyncHandler = require('express-async-handler');

// description: get to-dos
// route: GET /api/todos
// access: private
const getTodos = asyncHandler(async (req, res) => {
    res.json({message: `get to-do!`});
});

// description: create to-do
// route: POST /api/todos
// access: private
const createTodo = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error ('please add text');
    }
    res.json({message: `get to-do!`});
});

// description: update to-do
// route: PUT /api/todos/:id
// access: private
const updateTodo = asyncHandler(async (req, res) => {
    res.json({message: `get to-do!`});
});

// description: delete to-do
// route: DELETE /api/todos/:id
// access: private
const deleteTodo = asyncHandler(async (req, res) => {
    res.json({message: `get to-do!`});
});

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}