const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Mistake = new Schema({
    mistakeName: {
        type: String,
        require: true,
    },
    mistakeDescription: {
        type: String,
        require: true,
    },
    studentName: {
        type: Schema.Types.ObjectId,
        ref: "Student",
    },
})

 //add plugin
mongoose.plugin(slug);
Test.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})
module.exports = mongoose.model('Mistake', Mistake)