const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Admin = new Schema({
  adminName: {type:String, require: true,},
  adminSex: {type:String, require: true,},
  adminPhoneNumber: {type:Number},
  adminEmail: {type:String, require: true,},
  adminPassword: {type:String, require: true,},
  adminImage: {type:String},

  role: {type:String, require: true,}, 
},{
  timestamps: true,
})

module.exports = mongoose.model('Admin', Admin)

  