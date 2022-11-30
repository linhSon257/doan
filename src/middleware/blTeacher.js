const Teacher = require("../models/Teacher");


module.exports.blTeacher = function (req, res, next) {
    let _teacher =  Teacher.findOne({_id: req.cookies._id});
    const tRole = _teacher.role
    if(tRole=== 'Teacher'){
        return
    }
}