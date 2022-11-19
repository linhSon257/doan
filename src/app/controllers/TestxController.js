const Testx = require('../models/Testx')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class TestxController{
//[GET] ---list Text----
    index(req, res, next){
        Testx.find({})
        .then(testxs =>{
            res.render('testxs/testxList', { 
                testxs: multipleMongooseToObject(testxs)
             })
        } )
        .catch(next)   
          
    }
    show(req, res, next){

        Testx.findOne ({ _id: req.params._id  })
            .then((testx) => {
                res.render('testxs/show', { testx: mongooseToObject(testx) })
            })
            .catch(next)
    }  
//[GET] form create
    create(req, res, ){
        res.render('testxs/create')
    } 
//[POST]
    store(req, res, next){
        const testx = new Testx(req.body)
        testx.save()
            .then(()=> res.redirect('/testxs/manage'))
            .catch(next)

    } 

    edit(req, res, next){
        Testx.findById(req.params.id)
            .then(testx => res.render('testxs/edit',{
                testx: mongooseToObject(testx)
            }))
            .catch(next)
    } 

    //[GET] /course/:id/
    update(req, res, next){
        Testx.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/testxs/manage'))
            .catch(next)
    } 
     //[DELETE] /course/:id/
     delete(req, res, next){
        Testx.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }  
    //[DELETE] /course/:id/force
    forceDelete(req, res, next){
        Testx.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
    //[PATCH] /coures/:id/restore
    restore(req, res, next){
        Testx.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)

    }

        //[get] /me/stored/courses
        manage(req, res, next){
            Promise.all([ Testx.find({}), Testx.countDocumentsDeleted()])
                   .then(([testxs, deletedCount]) => 
                       res.render('testxs/manage',{
                           deletedCount,
                           testxs: multipleMongooseToObject(testxs)
                       })
                   )
                   .catch(next)      
           }
       
            //[get] /me/trash/courses
        trash(req, res, next){
               Testx.findDeleted({})
                    .then(testxs => res.render('testxs/trash',{
                        testxs: multipleMongooseToObject(testxs)
               }))
               .catch(next)
           }

}

module.exports = new TestxController()