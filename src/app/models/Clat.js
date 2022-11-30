const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')


const Clat = new Schema({ 
  clatName:{type:String, require: [true, "Please tell us the name of teacher "],},
  clatType:{type:String, require: true,},
  teacher: {type: Schema.Types.ObjectId, ref: "Teacher" },
  term: {type: Schema.Types.ObjectId, ref: "Term" },
  student:  {
    type: Array, 
    require: true, 
    default: []
  },
  course:  {
    type: Array, 
    require: true, 
    default: []
  },
  maxStudent:{type:Number, require: [true, "Please tell us maximum of students (1 To 50)"],},
  clatScheduleImage:{type:String, require: [true, "Please tell us the schedule Images "],}
},{
  timestamps: true,
})

Clat.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Clat', Clat)
