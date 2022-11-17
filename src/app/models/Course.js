const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')


const Course = new Schema({
  courseName: {type:String, require: true,},
  courseType: {type:String, require: true,},
  courseLevel: {type:String, require: true,},
  courseSlot: {type:Number, require: true,},
  courseTime: {type:Number, require: true,},
  courseDescription: {type:String},
  courseImage: {type:String},
  courseVideoId: {type: String, maxlength: 255}
},{
  timestamps: true,
})

  //add plugin
Course.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Course', Course)

  