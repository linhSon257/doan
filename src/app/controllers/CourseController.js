const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class CourseController{

    // [GET] /course/all course
    index(req, res, next){
        Course.find({})
        .then(courses =>{
            res.render('courses/allCourses', { 
                courses: multipleMongooseToObject(courses)
             })
        } )
        .catch(next)   
    }
    
    //[GET] /course/:slug detail
    show(req, res, next){

        Course.findOne ({_id: req.params.id  })
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
        const a = req.body.courseVideoId
        req.body.courseImage = ('https://i.ytimg.com/vi/'+a+'/maxresdefault.jpg')
        const course = new Course(req.body)
        course.save()
            .then(()=> res.redirect('/courses/manage'))
            .catch(next)             
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
        const a = req.body.courseVideoId
        req.body.courseImage = ('https://i.ytimg.com/vi/'+a+'/maxresdefault.jpg')
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/courses/manage'))
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

        //[get] /me/stored/courses
        manage(req, res, next){
            Promise.all([ Course.find({}), Course.countDocumentsDeleted()])
                   .then(([courses, deletedCount]) => 
                       res.render('courses/manage',{
                           deletedCount,
                           courses: multipleMongooseToObject(courses)
                       })
                   )
                   .catch(next)      
           }
       
            //[get] /me/trash/courses
        trash(req, res, next){
               Course.findDeleted({})
                    .then(courses => res.render('courses/trash',{
                   courses: multipleMongooseToObject(courses)
               }))
               .catch(next)
           }
}    
  
module.exports = new CourseController();