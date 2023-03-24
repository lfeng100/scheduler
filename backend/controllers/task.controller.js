const db = require("../models");
const Task = db.tasks;
const { QueryTypes } = require('sequelize');

// Create, Delete, Update, Find One, Find all

// Create and Save a new Task
exports.create = async (req, res) => {
     // Validate request
     // check for null values too? "!due_date"?
    if (!req.body.task_name || !req.body.user_id) {
      res.status(400).send({
        message: "Some task information is missing!"
      });
      return;
    }

    // create a task
    try {
      const task = {
        UserUserId: req.body.user_id,
        task_name: req.body.task_name,
        description: req.body?.description, // ? req.body.description : NULL,
        status: req.body?.status, //? req.body.status : NULL,
        created: req.body?.created, //? req.body.created : NULL,
        due_date: req.body?.due_date,// ? req.body.due_date : NULL,
        priority: req.body?.priority //? req.body.priority : 5
    };

      // Save Task in database
      const newly_created_task = await Task.create(task);

      res.status(201).send({
        task_id: newly_created_task.task_id,
        message: "Task created successfully."
      });
    } catch(err) {
      res.status(500).send({
            message:
              err.message || "Some error occurred while creating the task."
          });
    }
};

// List of all tasks embedded with users
exports.findAll = async (req, res) => {
    const paramUserId = req.params.user_id;
    console.log("paramUserId", paramUserId);

    try {
      const taskIds = await db.sequelize.query(`
        select distinct task_id, task_name, description, status, createdAt, updatedAt, due_date, priority from Tasks
        where UserUserId = ${paramUserId}`
      );
      console.log("taskIds:", taskIds);

      const taskIdsPrimmed = taskIds[0];

      let response = [];

      for(let i = 0; i < taskIdsPrimmed.length; i++) {
        const tagIds = await db.sequelize.query(`
          select TagTagId from TagTasks
          where TaskTaskId = ${taskIdsPrimmed[i]["task_id"]}     
        `, { type: QueryTypes.SELECT });

        console.log("tagIds:", tagIds);
        response.push({
          task_id: taskIdsPrimmed[i]["task_id"],
          task_name: taskIdsPrimmed[i]["task_name"],
          description: taskIdsPrimmed[i]["description"], //? taskIdsPrimmed[i]["description"] : NULL,
          status: taskIdsPrimmed[i]["status"],// ? taskIdsPrimmed[i]["status"] : NULL,
          createdAt: taskIdsPrimmed[i]["createdAt"],
          updatedAt: taskIdsPrimmed[i]["updatedAt"],
          due_date: taskIdsPrimmed[i]["due_date"],//? taskIdsPrimmed[i]["due_date"] : NULL,
          priority: taskIdsPrimmed[i]["priority"], //? taskIdsPrimmed[i]["priority"] : NULL,
          tag_list: tagIds
        })
      }

      res.send(response);
    } catch(err) {      
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving ${paramUserId}'s tasks.`
        });
    }
};

// Find a single Task with a task_id
exports.findOne = (req, res) => {
  const paramTaskid = req.params.task_id;
  console.log("paramTaskid", paramTaskid);

  Task.findByPk(paramTaskid)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Task with task_id=${paramTaskid}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Task with task_id=" + paramTaskid
      });
    });
};

// Update a task by the id in the request
exports.update = (req, res) => {
  const param_task_id = req.params.task_id;

  Task.update(req.body, {
    where: { task_id: param_task_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Task with task_id=${param_task_id}. Maybe Task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with task_id=" + param_task_id
      });
    });
};

// exports.update = async (req, res) => {
//   const task_id = req.params.task_id;
//   console.log("task_id", task_id, "body", req.body);

//     Task.findOne({
//       where: { task_id: task_id }
//     }).then(async task => {
//       console.log("task", task, task["task_name"]);
//       task.set({
//         task_name: req.body.task_name ? req.body.task_name : task["task_name"],
//         task_name: req.body.description ? req.body.description : task["description"],
//         task_name: req.body.status ? req.body.status : task["status"],
//         task_name: req.body.due_date ? req.body.due_date : task["due_date"],
//         task_name: req.body.priority ? req.body.task_name : task["priority"],
//       });

//       await task.save();
//     }).catch(err => {
//       res.status(500).send({
//         message: "Could not update Task with id=" + task_id
//       });
//     });
  //   console.log("task", task);
  //   task.set({
  //     // task_name: req.body.task_name ? req.body.task_name : task["task_name"],
  //     description: req.body.description ? req.body.description : task["description"],
  //     // status: req.body.status ? req.body.status : task["status"],
  //     // due_date: req.body.due_date ? req.body.due_date : task["due_date"],
  //     // priority: req.body.priority ? req.body.priority : task["priority"],
  //   });
  
  //   await task.save();
  // }
  // catch(err) {
  //   res.status(500).send({
  //     message: "Error updating task with id=" + task_id
  //   });
  // }

    // .then(async task => {
    //   console.log("task", task, task["task_name"]);
    //   task.set({
    //     task_name: req.body.task_name ? req.body.task_name : task["task_name"],
    //     task_name: req.body.description ? req.body.description : task["description"],
    //     task_name: req.body.status ? req.body.status : task["status"],
    //     task_name: req.body.due_date ? req.body.due_date : task["due_date"],
    //     task_name: req.body.priority ? req.body.task_name : task["priority"],
    //   });

    //   await task.save();

    // }) 
    // .
// };

// Delete a task with the specified task_id in the request
exports.delete = (req, res) => {
    const paramTaskid = req.params.task_id;

    Task.destroy({
      where: { task_id: paramTaskid }
    })
      .then(num => {
        if (num == 1) { // number of destroyed rows
          res.send({
            message: "Task was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete task with id=${paramTaskid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Task with id=" + paramTaskid
        });
      });
};

