const Course = require('../models/Course');
const { multipleMongooseToObject } = require ('../../util/mongoose')
class SiteController{

    //get /news
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
    //get/news/:slug

module.exports = new SiteController;