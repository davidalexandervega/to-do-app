const mongoose = require('mongoose');

const listSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('List', listSchema);