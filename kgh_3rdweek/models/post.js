const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }, 
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type:Date
    },
    password: {
        type: String,
        required: true
    }
});

var Post = mongoose.model('post', postSchema); 
module.exports = Post;