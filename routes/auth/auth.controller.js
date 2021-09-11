const express = require("express");
const router = express.Router();
const url = require("url");
const user = require("../../Models/user");
const bcrypt = require("bcrypt");
const generalTools = require("../../tools/generalTools");
router.get("/registerPage", generalTools.sessionChecker, (req, res) => {
  res.render("./auth/register", { msg: req.query.msg });
});

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    // return res.redirect("/auth/registerPage?msg=Empty Fields!!!");
    return res.redirect(
      url.format({
        pathname: "/auth/registerPage",
        query: { msg: "Empty Field!!!" },
      })
    );
  }
  user.findOne({ username: req.body.username }, (err, existUser) => {
    if (err) {
      return res.redirect(
        url.format({
          pathname: "/auth/registerPage",
          query: { msg: "server error" },
        })
      );
    } else if (existUser) {
      return res.redirect(
        url.format({
          pathname: "/auth/registerPage",
          query: { msg: "Exist user" },
        })
      );
    }
    const newUser = new user({
      username: req.body.username,
      password: req.body.password,
    });
    newUser.save({}, (err, data) => {
      if (err) {
        return res.redirect(
          url.format({
            pathname: "/auth/registerPage",
            query: { msg: "server error" },
          })
        );
      }

      return res.redirect("/auth/loginPage?msg=Welcome to our website");
    });
  });
});

router.get("/loginPage", generalTools.sessionChecker, (req, res) => {
  res.render("./auth/login", { msg: req.query.msg });
});

router.post("/login", (req, res) => {
  if (!req.body.username && !req.body.password) {
    return res.redirect("/auth/loginPage");
  }
  user.findOne({ username: req.body.username }, (err, user) => {
    if (err) {
      return res.redirect(
        url.format({
          pathname: "/auth/loginPage",
          query: { msg: "server error" },
        })
      );
    } else if (!user) {
      return res.redirect(
        url.format({
          pathname: "/auth/loginPage",
          query: { msg: "user not found" },
        })
      );
    }
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (!isMatch) {
        return res.redirect(
          url.format({
            pathname: "/auth/loginPage",
            query: { msg: "user not found" },
          })
        );
      }
      req.session.user = user._doc;
      return res.redirect("/user/dashboard");
    });
  });
});

module.exports = router;
