const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Schedule = new Schema({
  scheduleName: {type:String, require: true,},
  class: {type: Schema.Types.ObjectId, ref: "Class" },
  scheduleImage: {type:String},
},{
  timestamps: true,
})

  //add plugin
mongoose.plugin(slug);
Schedule.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('schedule', Schedule)

  