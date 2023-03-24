const User = require("../controllers/task.controller.js");
var router = require("express").Router();

module.exports = app => {
  // Delete a User with id
  router.delete("/:id", User.delete);

  app.use('/user', router);
};
