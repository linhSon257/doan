const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const Test = new Schema({
  testName: {type:String, require: true,},
  testLevel: {type:Number, require: true,},
  testDescription: {type:String},
  testImage: {type:String},
  testSlug: { type: String, slug: 'name', unique: true },
},{
  timestamps: true,
});

  //add plugin
mongoose.plugin(slug);
Test.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Test', Test)

  