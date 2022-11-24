const Teacher = require('../models/Teacher')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')



class AboutController{

    about(req, res, next){
        Teacher.find({})
        .then(teachers =>{
            res.render('about', { 
                teachers: multipleMongooseToObject(teachers)
             })
        } )
        .catch(next)     
    }
}

module.exports = new AboutController;