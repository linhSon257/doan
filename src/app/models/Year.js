const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Year = new Schema({
    yearName: {
        type: String,
        require: true,
    },

})
module.exports = mongoose.model('Year', Year)
