const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'List',
        default: null
    },
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    dueDate: {
        type: String,
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);