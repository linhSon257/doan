const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Bonus = new Schema({
    studentName: {type:Schema.Types.ObjectId, ref: "Student"},
    className: {type:Schema.Types.ObjectId, ref: "Class"},
    termName: {type:Schema.Types.ObjectId, ref: "Term"},    
    bonusName: {
      type: String,
      require: true,
  },
    bonusDescription: {
        type: String,
        require: true,
    },
  },{
    timestamps: true,
  });


Bonus.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})
module.exports = mongoose.model('Bonus', Bonus)
