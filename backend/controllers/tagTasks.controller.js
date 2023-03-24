const db = require("../models");
const Tags = db.tags;
const Tasks = db.tasks;

// Create relationship bewteen tag and task
exports.create = async (req, res) => {
 if (!req.body.tag_id || !req.body.task_id) {
    res.status(400).send({
      message: "tag_id or task_id is missing!"
    });
    return;
  }

  try {
    const tag_id = await Tags.findByPk(req.body.tag_id);
  
    const task_id = await Tasks.findByPk(req.body.task_id);
    
    if(tag_id == null) {
        throw "tag id not found in the database";
    }
    if(task_id == null) {
        throw "task id not found in the database";
    }
  
    await tag_id.addTask(task_id, { through: 'TagTasks' });

    res.status(201).send({
        message: `tag_id ${req.body.tag_id} and task_id ${req.body.task_id} link created successfully!`
    });

  } catch(err) {      
    res.status(500).send({
      message:
        err || `Some error occurred while creating relationship bewteen tag and task.`
    });
  }   
};


// Delete relationship bewteen tag and task
exports.delete = async (req, res) => {
    if (!req.body.tag_id || !req.body.task_id) {
        res.status(400).send({
          message: "tag_id or task_id is missing!"
        });
        return;
      }
    
      try {
        const tag_id = await Tags.findByPk(req.body.tag_id);
      
        const task_id = await Tasks.findByPk(req.body.task_id);
        
        if(tag_id == null) {
            throw "tag id not found in the database";
        }
        if(task_id == null) {
            throw "task id not found in the database";
        }

        await tag_id.removeTask(task_id, { through: 'TagTasks' });

        res.status(202).send({
            message: `tag_id ${req.body.tag_id} and task_id ${req.body.task_id} link removed successfully!`
        });

      } catch(err) {      
        res.status(500).send({
          message:
            err || `Some error occurred while deleting relationship bewteen tag and task.`
        });
      }   
};

