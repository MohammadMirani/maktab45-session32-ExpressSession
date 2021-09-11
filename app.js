const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const apiRouter = require("./routes/api");
const session = require("express-session");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// add mongoose to project
mongoose.connect(
  "mongodb://localhost:27017/startWithExpress",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log("[!]Database failed to connect!!!");
    console.log("[+]Database connected successfully");
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// ? Cookie Vs Session
app.use(
  session({
    key: "user_sid",
    secret: "mySecretKey",
    resave: false, 
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);

app.use((req, res, next) => {
  if(req.cookies.user_sid && !req.session.user){
    res.clearCookie("user_sid")
  }
  res.cookie("name", "john");
  console.log(req.session);
  console.log(req.cookies);
  next();
});

// app.get("/get", (req, res) => {
//   console.log(req.cookies);
//   res.send("get cookie");
// });

// app.get("/delete", (req, res) => {
//   res.clearCookie("name");
//   res.send("delete cookies");
// });

app.use("/", apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
