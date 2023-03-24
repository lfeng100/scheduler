const tagTasks = require("../controllers/tagTasks.controller.js");
var router = require("express").Router();

module.exports = app => {
  // Create a new Tag
  router.post("/", tagTasks.create);

  // Delete a Tag with id
  router.delete("/", tagTasks.delete);

  app.use('/tagTasks', router);
};