const Bonus = require('../models/Bonus')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
const Student = require('../models/Student')
const Clat = require('../models/Clat')


class BonusController{
//[GET] ---list Text----
    index(req, res, next){
        Bonus.find({})
        .then(bonuss =>{
            res.render('bonuss/bonusList', { 
                bonuss: multipleMongooseToObject(bonuss)
             })
        } )
        .catch(next)   
          
    }
    show(req, res, next){

        Bonus.findOne ({ _id: req.params.id  })
            .then((bonus) => {
                res.render('bonuss/show', { bonus: mongooseToObject(bonus) })
            })
            .catch(next)
    } 


//[GET] form create
    create(req, res, next){
        Promise.all([Student.find({}) , Clat.find({})])
        .then(([students, clats]) => 
            res.render('bonuss/create',{
                students: multipleMongooseToObject(students),
                clats: multipleMongooseToObject(clats)
            })
        )
        .catch(next)   
    } 

 

//[POST]
    store(req, res, next){
        const bonus = new Bonus(req.body)
        bonus.save()
            .then(()=> res.redirect('/bonuss/manage'))
            .catch(next)

    } 

    edit(req, res, next){
        Bonus.findById(req.params.id)
            .then(bonus => res.render('bonuss/edit',{
                bonus: mongooseToObject(bonus)
            }))
            .catch(next)
    } 

    //[GET] /course/:id/
    update(req, res, next){
        Bonus.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/bonuss/manage'))
            .catch(next)
    } 
     //[DELETE] /course/:id/
     delete(req, res, next){
        Bonus.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
    //[DELETE] /course/:id/force
    forceDelete(req, res, next){
        Bonus.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PATCH] /coures/:id/restore
    restore(req, res, next){
        Bonus.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

        //[get] /me/stored/terms
        manage(req, res, next){
            Promise.all([ Bonus.find({}), Bonus.countDocumentsDeleted()])
                   .then(([bonuss, deletedCount]) => 
                       res.render('bonuss/manage',{
                           deletedCount,
                           bonuss: multipleMongooseToObject(bonuss)
                       })
                   )
                   .catch(next)      
           }
       
            //[get] /me/trash/terms
        trash(req, res, next){
               Bonus.findDeleted({})
                    .then(bonuss => res.render('bonuss/trash',{
                        bonuss: multipleMongooseToObject(bonuss)
               }))
               .catch(next)
           }

}
      
  



module.exports = new BonusController()