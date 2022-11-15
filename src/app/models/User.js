const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const User = new Schema({
    userName: {
        type: String,
        require:  true,
        unique: true,
    },
    email: {
        type: String,
        require:  true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require:  true,
        unique: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
    }
})


module.exports = mongoose.model('User', User)