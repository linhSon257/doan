const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Student = new Schema({
  studentName: {type:String, require: true,},
  studentSex: {type:String, require: true,},
  studentPhoneNumber: {type:Number},
  studentDateOfBirth: {type:String},
  studentEmail: {type:String, require: true,},
  studentStatus: {type:Boolean, require: true,},
  studentLocation: {type:String},
  studentImage: {type:String},
  studentParentName: {type:String},
  studentParentPhone: {type:Number},
  StudentSlug: { type: String, slug: 'name', unique: true },
},{
  timestamps: true,
})

  //add plugin
mongoose.plugin(slug);
Student.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Student', Student)

  