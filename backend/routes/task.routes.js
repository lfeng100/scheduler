const task = require("../controllers/task.controller.js");
var router = require("express").Router();

module.exports = app => {
  // Create a new Task
  router.post("/", task.create); // done

  // Retrieve all Tasks
  router.get("/:user_id", task.findAll); // done

  // Retrieve a single Task with id
  router.get("/task/:task_id", task.findOne); // done

  // Update a Task with id
  router.put("/task/:task_id", task.update); 

  // Delete a Task with id
  router.delete("/:task_id", task.delete);  // done

  app.use('/tasks', router);
};
