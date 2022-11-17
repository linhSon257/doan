const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator')
const mongooseDelete = require('mongoose-delete')



const Testx = new Schema({
  testxName: {type:String, require: true,},
  testxLevel: {type:Number, require: true,},
  testxTime: {type:Number,},
  testxDescription: {type:String},
  testxImage: {type:String, default: "https://images.squarespace-cdn.com/content/v1/5c2d190d5ffd20fcfe3de667/1596565216519-RC73P1L6TP8G0GQMKEVI/BacktoSchool.Teacing.TableMagazine.jpg?format=1000w"},
},{
  timestamps: true,
});

  //add plugin
Testx.plugin(mongooseDelete,{ 
  deletedAt: true,
  overrideMethods: 'all'})

module.exports = mongoose.model('Testx', Testx)

  