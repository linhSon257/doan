const Student = require('../models/Student')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class StudentController{
//[GET] ---list Text----
    index(req, res, next){
        Student.find({})
        .then(students =>{
            res.render('students/allstudents', { 
                students: multipleMongooseToObject(students)
             })
        } )
        .catch(next)     
    }

    show(req, res, next){

        Student.findOne ({ _id: req.params.id  })
            .then((student) => {
                // res.render('/home', { student: mongooseToObject(student) }),
                res.render('students/show', { student: mongooseToObject(student) })
            })
            .catch(next)
    }  
 
//[GET] form create
    create(req, res, ){
        res.render('students/create')
    } 
//[POST]
    store(req, res, next){
        req.body.role = "Student"
        const student = new Student(req.body)
        student.save()
            .then(()=> res.redirect('/students/manage'))
            .catch(next)
    } 

    edit(req, res, next){
        Student.findById(req.params.id)
            .then(student => res.render('students/edit',{
                student: mongooseToObject(student)
            }))
            .catch(next)
    } 

    //[GET] /course/:id/
    update(req, res, next){
        Student.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/students/manage'))
            .catch(next)
    } 
     //[DELETE] /course/:id/
     delete(req, res, next){
        Student.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
    //[DELETE] /course/:id/force
    forceDelete(req, res, next){
        Student.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PATCH] /coures/:id/restore
    restore(req, res, next){
        Student.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

        //[get] /me/stored/courses
        manage(req, res, next){
            Promise.all([ Student.find({}), Student.countDocumentsDeleted()])
                   .then(([students, deletedCount]) => 
                        
                       res.render('students/manage',{
                           deletedCount,
                           students: multipleMongooseToObject(students)
                       })
                   )
                   .catch(next)      
           }

           getStudent(req, res, next){
            Promise.all([ Student.find({}), Student.countDocumentsDeleted()])
                   .then(([students, deletedCount]) => 
                        
                       res.render('home',{
                           deletedCount,
                           students: multipleMongooseToObject(students)
                       })
                   )
                   .catch(next)      
           }
       


            //[get] /me/trash/courses
        trash(req, res, next){
               Student.findDeleted({})
                    .then(students => res.render('students/trash',{
                        students: multipleMongooseToObject(students)
               }))
               .catch(next)
           }
}

module.exports = new StudentController()