const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')


const Schedule = new Schema({
  scheduleName: {type:String, require: true,},
  scheduleImage: {type:String},
  scheduleSlug: { type: String, slug: 'name', unique: true },
  scheduleVideoId: {type: String, maxlength: 255}
},{
  timestamps: true,
})

  //add plugin
mongoose.plugin(slug);
Schedule.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('schedule', Schedule)

  