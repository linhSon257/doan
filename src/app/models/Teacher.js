const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Teacher = new Schema({ teacherName: {type:String, require: true,},
 
  teacherSex: {type:String, require: true,},
  teacherPhoneNumber: {type:Number},
  teacherDateOfBirth: {type:String},
  teacherEmail: {type:String, require: true,},
  teacherPassword: {type:String, require: true,},
  teacherStatus: {type:Boolean, require: true,},
  teacherLocation: {type:String},
  teacherImage: {type:String},
  role: {type:Number, default:1,},
  teacherSlug: { type: String, slug: 'name', unique: true },
},{
  timestamps: true,
})

  //add plugin
mongoose.plugin(slug);
Teacher.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Teacher', Teacher)

  