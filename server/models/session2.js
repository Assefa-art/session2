const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : String,
    age: Number,
    email : String,
    phoneNumber : String,
    password: String,
    role : String
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel

