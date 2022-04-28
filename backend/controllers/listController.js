const asyncHandler = require('express-async-handler');

const List = require('../models/listModel');
const User = require('../models/userModel');

// description: get lists
// route: GET /api/lists
// access: private
const getLists = asyncHandler(async (req, res) => {
  // authMiddleware.js sets the user object to req.user
  // user is a key to each list, user._id being the value:
  const lists = await List.find({ user: req.user.id });
  res.status(200).json(lists);
});

// description: create list
// route: POST /api/lists
// access: private
const createList = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error('please add the required field(s)');
  }

  // place a limit of 250 lists total in the database
  // to keep it at a demo size:
  const maxedOut = await List.count();
  if (maxedOut >= 250) {
    res.status(400);
    throw new Error('lists are at capacity');
  }

  const list = await List.create({
    title: req.body.title,
    // req.user.id is taken from the login token:
    user: req.user.id,
  });
  res.status(200).json(list);
});

// description: update list
// route: PUT /api/lists/:id
// access: private
const updateList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error('list not found');
  }

  // authMiddleware.js sets the user object to req.user
  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }

  // verify that the logged in user matches the list's user:
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  const updatedList = await List.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedList);
});

// description: delete list
// route: DELETE /api/lists/:id
// access: private
const deleteList = asyncHandler(async (req, res) => {
  const list = await List.findById(req.params.id);

  if (!list) {
    res.status(400);
    throw new Error('list not found');
  }

  // authMiddleware.js sets the user object to req.user
  if (!req.user) {
    res.status(401);
    throw new Error('user not found');
  }

  // verify that the logged in user matches the list's user:
  if (list.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  await list.remove();
  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getLists,
  createList,
  updateList,
  deleteList,
};
