const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class HomeController{


    // home(req, res){
    //     res.render("home");
    // }

    index(req, res, next){
        Course.find({})
        .then(courses =>{
            res.render('home', { 
                courses: multipleMongooseToObject(courses)
             })
        } )
        .catch(next)     
    }
}

module.exports = new HomeController;