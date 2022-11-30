const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Bonus = new Schema({
    student: {type:Schema.Types.ObjectId, ref: "Student"},
    term: {type:Schema.Types.ObjectId, ref: "Term"},    
    bonusName: {
      type: String,
      require: true,
  },
    bonusDescription: {
        type: String,
    },
  },{
    timestamps: true,
  });


Bonus.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})
module.exports = mongoose.model('Bonus', Bonus)
