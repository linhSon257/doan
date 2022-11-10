const Course = require('../models/Course');

class SiteController{

    //get /news
    index(req, res){
        
        Course.find({}, function (err, courses){
            if (!err) {
                res.json(courses)
            }else{
                res.status(400).json({error: 'error!!!'})
            }
            
        });
        
    }
    //get/news/:slug

}

module.exports = new SiteController;