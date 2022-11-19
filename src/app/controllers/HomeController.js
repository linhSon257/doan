const Course = require('../models/Course');
const Teacher = require('../models/Teacher');
class HomeController{


    home(req, res){
        res.render("home");
    }

    // getTeacher(req, res, next){
    //     Teacher.find({})
    //     .then(teachers =>{
    //         res.render('', { 
    //             teachers: multipleMongooseToObject(teachers)
    //          })
    //     } )
    //     .catch(next)     
    // }
}

module.exports = new HomeController;