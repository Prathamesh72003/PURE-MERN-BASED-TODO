const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    
    // status: {
    //     type: Boolean,
    //     required: true
    // }

})

module.exports = mongoose.model('todo', todoSchema);