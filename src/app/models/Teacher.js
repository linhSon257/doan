const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Teacher = new Schema({ 
  teacherName: {type:String, require: [true, "Please tell us the name of teacher "],},
  teacherGender: {type:String, require: true,},
  teacherPhoneNumber: {type:String, require: true,},
  teacherDateOfBirth: {type:String},
  teacherEmail: {type:String, require: true,},
  teacherPassword: {type:String, require: true,},
  teacherStatus: {type:String, require: true,},
  teacherLocation: {type:String},
  teacherDescription: {type:String},
  teacherImage: {type:String, require: true},
  role: {type:String, require: true,},
},{
  timestamps: true,
})

  //add plugin
mongoose.plugin(slug);
Teacher.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Teacher', Teacher)

  