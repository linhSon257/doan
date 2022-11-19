 const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Student = new Schema({
  studentName: {type:String, require: true,},
  studentSex: {type:String, require: true,},
  studentPhoneNumber: {type:String, require: true,},
  studentDateOfBirth: {type:String},
  studentEmail: {type:String, require: true,},
  studentPassword: {type:String, require: true,},
  studentStatus: {type:String, require: true,},
  studentLocation: {type:String},
  studentImage: {type:String, require: true,},
  studentParentName: {type:String},
  studentParentPhone: {type:Number},
  // studentClass: {type:Schema.Types.ObjectId, ref: "Class",},
  termName: {
    type: Schema.Types.ObjectId,
    ref: "Term",
},
  role: {type:String, require: true,}, //0: admin , 1: teacher, 2: Student
},{
  timestamps: true,
})

  //add plugin
Student.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Student', Student)

  