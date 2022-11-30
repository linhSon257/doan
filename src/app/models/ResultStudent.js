const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')



const ResultStudent = new Schema({
    clat: {type:Schema.Types.ObjectId, ref: "Clat",},
    term: {type:Schema.Types.ObjectId, ref: "Term",},
    student: {type:Schema.Types.ObjectId, ref: "Student",},
    scoreCourse: Array,
    bonus: {type:Schema.Types.ObjectId, ref: "Bonus",},
    mistake: {type:Schema.Types.ObjectId, ref: "Mistake",},
    conduct: {
      type: String,
      require: true,
    },
    resultScore:{
      type: Number,
      require: true,
    },
    evaluate: {type: String ,require: true,},
    

  },{
    timestamps: true,
  });

  //add plugin
ResultStudent.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('ResultStudent', ResultStudent)

  