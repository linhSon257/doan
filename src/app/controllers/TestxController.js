const Testx = require('../models/Testx')
const { multipleMongooseToObject, mongooseToObject } = require ('../../util/mongoose')
class TestxController{
//[GET] ---list Text----
    index(req, res){
        res.render("testx/testxList")
    }
//[GET] form create
    create(req, res, next){
        res.render('testx/create')
    } 
//[POST]
    store(req, res, next){
        const testx = new Testx(req.body)
        testx.save()
            .then(()=> res.redirect('testx/testxList'))
            .catch(next)

    } 

}

module.exports = new TestxController()