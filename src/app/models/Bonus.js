const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')

const Bonus = new Schema({
    studentName: {type:Schema.Types.ObjectId, ref: "Student"},
    termName: {type:Schema.Types.ObjectId, ref: "Term"},    
    BonusDescription: {
        type: String,
        require: true,
    },
})

 //add plugin
mongoose.plugin(slug);
Test.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})
module.exports = mongoose.model('Bonus', Bonus)
