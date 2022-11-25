const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const ScoreCourse = new Schema({
    course: {type:Schema.Types.ObjectId, ref: "Course"},
    student: {type:Schema.Types.ObjectId, ref: "Student"},
    testx: {type:String, require: true,},
    term: {type: String, require: true,},
  },{
    timestamps: true,
  });

  //add plugin
ScoreCourse.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('ScoreCourse', ScoreCourse)

  