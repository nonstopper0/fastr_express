const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    bio: {type: String},
    matches: {type: String},
    location: {type: String},
    likes_given: {type: Array},
    likes_received: {type: Array},
    dislikes_given: {type: Array},
    matches: {type: Array}
})

const User = mongoose.model('User', userSchema)

module.exports = User;
