const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class CourseController{

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
            .then(()=> res.redirect('/'))
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
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
}    
  

module.exports = new CourseController();