const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Class = new Schema({
  className: {type:String, require: [true, "Please tell us the name of class"],},
  classType: {type:String, require: [true, "Please tell us the type of class"],},
  teacherName: {type: Schema.Types.ObjectId, ref: "Teacher"},
  student: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }],
  resultStudent: [{
    type: Schema.Types.ObjectId,
    ref: 'ResultStudent'
  }],
  numberOfStudent: {type:Number},


  classSlug: { type: String, slug: 'name', unique: true },

},{
  timestamps: true,
})

  //add plugin
mongoose.plugin(slug);
Class.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Class', Class)

  