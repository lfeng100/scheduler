const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport')
const session = require('express-session')
require('dotenv').config()
const db = require("./models");
require('./config/passport')


const app = express();
var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(session({
  secret: process.env.SESSION_SECRET || "secret",
  resave: false,
  saveUninitialized: true,
  cookie:{_expires : 60000000}
}));

app.use(passport.initialize());
app.use(passport.session());

require("./routes/tag.routes")(app);
require("./routes/auth.routes")(app,passport);
require("./routes/task.routes")(app);
require("./routes/tagTask.routes")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.send(err.message);
});


db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });


module.exports = app;
