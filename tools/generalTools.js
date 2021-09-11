generalTools = {};

generalTools.sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    return res.redirect("/user/dashboard");
  }
  return next();
};

generalTools.loginChecker = (req, res, next)=>{
    if(!req.session.user || !req.cookies.user_sid){
        return res.redirect('/auth/loginPage?msg=welcome')
    }
    return next()

}

module.exports = generalTools;
