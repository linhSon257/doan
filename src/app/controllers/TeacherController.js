const Teacher = require('../models/Teacher')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class TeacherController{
//[GET] ---list Text----
    index(req, res, next){
        Teacher.find({})
        .then(teachers =>{
            res.render('teachers/allteachers', { 
                teachers: multipleMongooseToObject(teachers)
             })
        } )
        .catch(next)     
    }

    show(req, res, next){

        Teacher.findOne ({ _id: req.params.id  })
            .then((teacher) => {
                // res.render('/home', { teacher: mongooseToObject(teacher) }),
                res.render('teachers/show', { teacher: mongooseToObject(teacher) })
            })
            .catch(next)
    }  
 
//[GET] form create
    create(req, res, ){
        res.render('teachers/create')
    } 
//[POST]
    store(req, res, next){
        req.body.role = 'Teacher'
        const teacher = new Teacher(req.body)
        teacher.save()
            .then(()=> res.redirect('/teachers/manage'))
            .catch(next)
    } 

    edit(req, res, next){
        Teacher.findById(req.params.id)
            .then(teacher => res.render('teachers/edit',{
                teacher: mongooseToObject(teacher)
            }))
            .catch(next)
    } 

    //[GET] /course/:id/
    update(req, res, next){
        Teacher.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/teachers/manage'))
            .catch(next)
    } 
     //[DELETE] /course/:id/
     delete(req, res, next){
        Teacher.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
    //[DELETE] /course/:id/force
    forceDelete(req, res, next){
        Teacher.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PATCH] /coures/:id/restore
    restore(req, res, next){
        Teacher.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }


        manage(req, res, next){
            Promise.all([ Teacher.find({}), Teacher.countDocumentsDeleted()])
                   .then(([teachers, deletedCount]) => 
                        
                       res.render('teachers/manage',{
                           deletedCount,
                           teachers: multipleMongooseToObject(teachers)
                       })
                   )
                   .catch(next)      
           }

        //    getTeacher(req, res, next){
        //     Promise.all([ Teacher.find({}), Teacher.countDocumentsDeleted()])
        //            .then(([teachers, deletedCount]) => 
                        
        //                res.render('home',{
        //                    deletedCount,
        //                    teachers: multipleMongooseToObject(teachers)
        //                })
        //            )
        //            .catch(next)      
        //    }
       


            //[get] /me/trash/courses
        trash(req, res, next){
               Teacher.findDeleted({})
                    .then(teachers => res.render('teachers/trash',{
                        teachers: multipleMongooseToObject(teachers)
               }))
               .catch(next)
           }
}

module.exports = new TeacherController()