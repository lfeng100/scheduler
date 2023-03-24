const db = require("../models");
const Tags = db.tags;
const { QueryTypes } = require('sequelize');


// Create and Save a new tag
exports.create = (req, res) => {
 // Validate request
 if (!req.body.tag_name || !req.body.color || !req.body.user_id) {
    res.status(400).send({
      message: "Some tag information is missing!"
    });
    return;
  }

  // Create a tag
  const tag = {
    UserUserId: req.body.user_id,
    tag_name: req.body.tag_name,
    color: req.body.color,    
  };
  console.log(tag);

  // Save tag in the database
  Tags.create(tag)
    .then(() => {
      res.status(201).send({
        message:
          "Tag created successfully."
      });;
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tag."
      });
    });
};

// Retrieve all tasks of a user from the database.
exports.findAll = async (req, res) => {
    const paramUserId = req.params.user_id;
    console.log(paramUserId);

    try {
      const tagIds = await db.sequelize.query(`
        select distinct tag_id, tag_name, color from Tags
        where UserUserId = ${paramUserId}`
      );
      console.log("tagIds:", tagIds);

      const tagIdsPrimmed = tagIds[0];
      // somehow same thing got outputted twice

      let response = [];
      for(let i = 0; i < tagIdsPrimmed.length; i++) {
        const taskIds = await db.sequelize.query(`
          select TaskTaskId from TagTasks
          where TagTagId = ${tagIdsPrimmed[i]["tag_id"]}      
        `, { type: QueryTypes.SELECT });
        response.push({
          tag_id: tagIdsPrimmed[i]["tag_id"],
          tag_color: tagIdsPrimmed[i]["color"],
          tag_name:  tagIdsPrimmed[i]["tag_name"],
          tasks: taskIds
        })
      }

      res.send(response);
    } catch(err) {      
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving ${paramUserId}'s tags.`
        });
    }
};

// Find all tasks with this tag_id
exports.findOne = async (req, res) => {
    const paramTagid = req.params.tag_id;

    try {
      const taskIds = await db.sequelize.query(`
      select TaskTaskId from TagTask
      where TagTagId = ${paramTagid}
      `, { type: QueryTypes.SELECT });

      const tagInfo = await db.sequelize.query(`
      select tag_id, tag_name, color from Tags
      where tag_id = ${paramTagid}
      `, { type: QueryTypes.SELECT });

      console.log("taskIds, tagInfo:", taskIds, tagInfo);

      res.send(Object.assign(tagInfo[0], {        
        tasks: taskIds
      }));
    } catch(err) {      
        res.status(500).send({
          message:
            err.message || `Some error occurred while retrieving tag ${paramTagid}'s tasks.`
        });
    }
};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {

// };

// Delete a tag with the specified tag_id in the request
exports.delete = (req, res) => {
    const paramTagid = req.params.tag_id;

    Tags.destroy({
      where: { tag_id: paramTagid }
    })
      .then(num => {
        if (num == 1) { // number of destroyed rows
          res.send({
            message: "Tag was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete tag with id=${paramTagid}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + paramTagid
        });
      });
};

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {

// };

