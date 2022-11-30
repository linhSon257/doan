const Teacher = require('../models/Teacher')
const Course = require('../models/Course')
const Student = require('../models/Student')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
const { Promise } = require('mongoose')


class AboutController{

    about(req, res, next){
        // Promise.all
        // const numCourse = Course.count()
        
        // Teacher.find({})
        // .then(teachers =>{
        //     res.render('about', { 
        //         teachers: multipleMongooseToObject(teachers)
        //      })
        // } )
        // .catch(next)     


        Promise.all([ Teacher.find({}), Course.countDocuments(), Student.countDocuments()])
        .then(([teachers, CountCourse, CountStudent]) => 
            res.render('about',{
                CountCourse,
                CountStudent,
                teachers: multipleMongooseToObject(teachers)
            })
        )
        .catch(next) 
    }
}

module.exports = new AboutController;