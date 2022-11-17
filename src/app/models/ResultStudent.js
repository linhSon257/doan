const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const ResultStudent = new Schema({
    courseName: {type:Schema.Types.ObjectId, ref: "Course",},
    studentName: {type:Schema.Types.ObjectId, ref: "Student",},
    testName: {type:Schema.Types.ObjectId, ref: "Test",},
    termName: {type:Schema.Types.ObjectId, ref: "Term",},
    averageScoreCourse: {type: Number},
    scoreCourse:[{type:Schema.Types.ObjectId, ref: "ScoreCourse",}],
    conduct: {
      type: String,
    },
    termName: {type:Schema.Types.ObjectId, ref: "Term",},
    evaluate: {type: String},
    
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

  