class ContactController{

    //contact
    index(req, res){
        res.render("contact");
    }
}

module.exports = new ContactController;