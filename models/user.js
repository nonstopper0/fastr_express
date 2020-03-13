const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, require: true},
    bio: {type: String, require: false},
    matches: {type: String, require: false},
})

const User = mongoose.model('User', userSchema)

module.exports = User;
