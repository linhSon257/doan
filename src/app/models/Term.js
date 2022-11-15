const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Term = new Schema({
    termName: {
        type: String,
        require: true,
    },

    yearName: {
        type: Number,
        require: true,
    },

})
module.exports = mongoose.model('Term', Term)
