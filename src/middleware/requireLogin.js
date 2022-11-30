const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Admin = require("../models/Admin");

// const jwt = require("jsonwebtoken");
 module.exports.requireLogin = function (re, res, next) {
    console.log('cookies',cookies)


  if(!req.cookies._id){
    res.redirect('/auths/login');
    return;
  }
   let _teacher =  Teacher.findOne({
    $or: [{ _id: req.cookies._id }]
  });

  let _student =  Student.findOne({
    $or: [{ _id: req.cookies._id }]
  });

  let _admin =  Admin.findOne({
    $or: [{ _id: req.cookies._id }]
  });

  if(!_teacher){
    res.redirect('/auths/login')
    return
  }


  if(!_admin){
    res.redirect('/auths/login')
    return
  }

  if(!_student){
    res.redirect('/auths/login')
    return
  }
 
}