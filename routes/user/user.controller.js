const express = require("express");
const router = express.Router();
const generalTools = require("../../tools/generalTools");
router.get("/dashboard", generalTools.loginChecker, (req, res, next) => {
  res.render("./user/dashboard", { user: req.session.user });
});

module.exports = router;
