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
  studentPassword: {type:String, require: true,},
  studentStatus: {type:Boolean, require: true,},
  studentLocation: {type:String},
  studentImage: {type:String},
  studentParentName: {type:String},
  studentParentPhone: {type:Number},
  termName: {
    type: Schema.Types.ObjectId,
    ref: "Term",
},
  role: {type:Number, default:2,} //0: admin , 1: teacher, 2: Student
},{
  timestamps: true,
})

  //add plugin
Student.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Student', Student)

  