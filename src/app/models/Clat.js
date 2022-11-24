const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')


const Clat = new Schema({ 
  clatName:{type:String, require: [true, "Please tell us the name of teacher "],},
  clatType:{type:String, require: [true, "Please tell us the name of teacher "],},
  teacherName: {type: Schema.Types.ObjectId, ref: "Teacher" },
  studentName: [{type: Schema.Types.ObjectId, ref: "Student" },],
  minStudent:{type:Number, require: [true, "Please tell us the name of teacher "],},
  maxStudent:{type:Number, require: [true, "Please tell us the name of teacher "],},
},{
  timestamps: true,
})

Clat.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Clat', Clat)
