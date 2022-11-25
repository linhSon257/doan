const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete')


const Schedule = new Schema({
  scheduleName: {type:String, require: true,},
  clat: {type: Schema.Types.ObjectId, ref: "Class" },
  scheduleImage: {type:String},
},{
  timestamps: true,
})

  //add plugin
Schedule.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('schedule', Schedule)

  