const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Conduct = new Schema({
    conductName: {
        type: String,
        require: true,
    },

})
module.exports = mongoose.model('Conduct', Conduct)
