const Admin = require('../models/Admin');
const Bonus = require('../models/Bonus');
const Class = require('../models/Class');
const Conduct = require('../models/Conduct');
const Course = require('../models/Course');
const Mistake = require('../models/Mistake');
const ResultStudent = require('../models/ResultStudent');
const Schedule = require('../models/Schedule');
const ScoreCourse = require('../models/ScoreCourse');
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Term = require('../models/Term');
const Test = require('../models/Test');
const Year = require('../models/Year');

const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class AdminController{

    //[GET] /course/all course
    index(req, res){
        res.render('courses/allCourses')
    }

    //[GET] /course/:slug detail
    show(req, res, next){

        Course.findOne ({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }  
//[GET] /course/ create
    create(req, res, next){
        res.render('courses/create')
    }  

//[POST] /course/ store
    store(req, res, next){
        const a = req.body.videoId
        req.body.image = ('https://i.ytimg.com/vi/'+a+'/maxresdefault.jpg')
        const course = new Course(req.body)
        course.save()
            .then(()=> res.redirect('/me/stored/courses'))
            .catch(error=>{
                
            })
    } 

//[GET] /course/:id/edit
    edit(req, res, next){
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit',{
                course: mongooseToObject(course)
            }))
            .catch(next)
    }  

//[GET] /course/:id/
    update(req, res, next){
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }  

    //[DELETE] /course/:id/
    delete(req, res, next){
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
    //[DELETE] /course/:id/force
    forceDelete(req, res, next){
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PATCH] /coures/:id/restore
    restore(req, res, next){
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }


}    
  

module.exports = new CourseController();