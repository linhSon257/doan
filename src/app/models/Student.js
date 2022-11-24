 const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Student = new Schema({
  studentName: {type:String, require: true,},
  studentGender: {type:String, require: true,},
  studentPhoneNumber: {type:String, require: true,},
  studentDateOfBirth: {type:String, require: true,},
  studentEmail: {type:String, require: true,},
  studentPassword: {type:String, require: true,},
  studentStatus: {type:String, require: true,},
  studentLocation: {type:String},  
  studentParentName: {type:String},
  studentParentPhone: {type:String},
  studentImage: {type:String, require: true,},
  role: {type:String, require: true,},  
},{
  timestamps: true,
})

  //add plugin
Student.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Student', Student)

  