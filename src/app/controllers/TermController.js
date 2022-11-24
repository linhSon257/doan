const Term = require('../models/Term')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class TermController{
//[GET] ---list Text----
    index(req, res, next){
        Term.find({})
        .then(terms =>{
            res.render('terms/termList', { 
                terms: multipleMongooseToObject(terms)
             })
        } )
        .catch(next)   
          
    }

    show(req, res, next){

        Term.findOne ({ _id: req.params.id  })
            .then((term) => {
                res.render('terms/show', { term: mongooseToObject(term) })
            })
            .catch(next)
    }  
//[GET] form create
    create(req, res, next){
        res.render('terms/create')
    } 
//[POST]
    store(req, res, next){
        const term = new Term(req.body)
        term.save()
            .then(()=> res.redirect('/terms/manage'))
            .catch(next)

    } 

    edit(req, res, next){
        Term.findById(req.params.id)
            .then(term => res.render('terms/edit',{
                term: mongooseToObject(term)
            }))
            .catch(next)
    } 

    //[GET] /course/:id/
    update(req, res, next){
        Term.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/terms/manage'))
            .catch(next)
    } 
     //[DELETE] /course/:id/
     delete(req, res, next){
        Term.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
    //[DELETE] /course/:id/force
    forceDelete(req, res, next){
        Term.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PATCH] /coures/:id/restore
    restore(req, res, next){
        Term.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

        //[get] /me/stored/courses
        manage(req, res, next){
            Promise.all([ Term.find({}), Term.countDocumentsDeleted()])
                   .then(([terms, deletedCount]) => 
                       res.render('terms/manage',{
                           deletedCount,
                           terms: multipleMongooseToObject(terms)
                       })
                   )
                   .catch(next)      
           }
       
            //[get] /me/trash/courses
        trash(req, res, next){
               Term.findDeleted({})
                    .then(terms => res.render('terms/trash',{
                        terms: multipleMongooseToObject(terms)
               }))
               .catch(next)
           }

}

module.exports = new TermController()