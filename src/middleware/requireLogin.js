module.exports = {
  requireLogin(req, res, next) {
    
    const {username, password} = req.body;

    const hasUser = User.findOne({username});
    if(hasUser) {
        if(hasUser.role === "admin" ) {
            return next()
        }

        if(has)



        return next()
    }

    let isLogin = true;
    if (isLogin) {
      return next();
    }
    return res.redirect("back");
  },
};
