const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')



const ResultStudent = new Schema({
    course: {type:Schema.Types.ObjectId, ref: "Course",},
    student: {type:Schema.Types.ObjectId, ref: "Student",},
    testx: {type:Schema.Types.ObjectId, ref: "Test",},
    term: {type:Schema.Types.ObjectId, ref: "Term",},
    averageScoreCourse: {type: Number},
    scoreCourse:[{type:Schema.Types.ObjectId, ref: "ScoreCourse",}],
    conduct: {
      type: String,
    },
    evaluate: {type: String},
    

  },{
    timestamps: true,
  });

  //add plugin
ResultStudent.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('ResultStudent', ResultStudent)

  