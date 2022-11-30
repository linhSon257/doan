const Student = require("../models/Student");


module.exports.blStudent = function (req, res, next) {
    let _student =  Student.findOne({_id: req.params.id});
    const sRole = _student.role
    if(_student){
        return
    }
 
}