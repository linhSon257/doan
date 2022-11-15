class AboutController{

    //about
    index(req, res){
        res.render("about");
    }
}

module.exports = new AboutController;