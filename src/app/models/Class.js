const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Class = new Schema({
  className: {type:String, require: true,},
  classType: {type:String, require: true,},
  teacherName: {type:String},
  numberOfStudent: {type:String},
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

  