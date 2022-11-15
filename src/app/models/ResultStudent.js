const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const ResultStudent = new Schema({
    courseName: {type:String, require: true,},
    studentName: {type:String, require: true,},
    testName: {type:String, require: true,},
    termName: {type: String, require: true,},
    scoreCourse:{type:Int, require: true,},
    evaluate: {type: String},
    averageScoreCourse: {type: Number},
    slug: { type: String, slug: 'name', unique: true },
  },{
    timestamps: true,
  });

  //add plugin
mongoose.plugin(slug);
ResultStudent.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('ResultStudent', ResultStudent)

  