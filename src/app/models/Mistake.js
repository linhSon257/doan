const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')

const Mistake = new Schema({
    student: {type:Schema.Types.ObjectId, ref: "Student"},
    term: {type:Schema.Types.ObjectId, ref: "Term"},    
    mistakeName: {
      type: String,
      require: true,
  },
    mistakeDescription: {
        type: String,
        require: true,
    },
  },{
    timestamps: true,
  });

 //add plugin
Mistake.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})
module.exports = mongoose.model('Mistake', Mistake)
