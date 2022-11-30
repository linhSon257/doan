const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')



const ScoreCourse = new Schema({
    course: {type:Schema.Types.ObjectId, ref: "Course"},
    student: {type:Schema.Types.ObjectId, ref: "Student"},
    term: {type:Schema.Types.ObjectId, ref: "Term"},
    test1: {type:Number, require: true,},
    test2: {type:Number, require: true,},
    test3: {type:Number, require: true,},
    averageScoreCourse: {type:Number, require: true,},
    statusScoreCourse: {type:String, require: true,},
  },{
    timestamps: true, 
  });

  //add plugin
ScoreCourse.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('ScoreCourse', ScoreCourse)

  