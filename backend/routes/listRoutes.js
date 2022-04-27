const express = require('express');
const router = express.Router();

// import the handling functions from the controller:
const { getLists, createList, updateList, deleteList } = require('../controllers/listController');

// import the auth middleware to protect private routes:
const {protect} = require('../middleware/authMiddleware');

router.get('/', protect, getLists);

router.post('/', protect, createList);

router.put('/:id', protect, updateList);

router.delete('/:id', protect, deleteList);

module.exports = router;