const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.dashboard = (req, res) => {
  res.send("Will render dashboard");
}

exports.verify = (req, res) => {
  const email = req.body.email;
  const verificationCode = req.body.verificationCode;
  console.log

  User.findOne({
    where: {
      email: email
    }
  }).then(function (user) {
    if (!user) {
      return done(null, false, {
        message: 'Email does not exist'
      });
    }
    var userinfo = user.get();
    console.log(userinfo);
    if (userinfo.verificationCode != verificationCode) {
      res.status(400).send('{ "msg": "Incorrect Verification Code", "code": 406 }');
    } else if (userinfo.verified == true) {
      res.status(400).send('{ "msg": "User Already Verified", "code": 407 }');
    }
    else {
      user.update({ verified: true })
      .then(function (row) {
        console.log(row);
        res.status(200).send('{ "msg": "success", "code": 200 }');
      }).catch(function (err) {
        console.log("Error:", err);
        res.status(400).send(err);
      })
    }
  }).catch (function (err) {
    console.log("Error:", err);
    res.status(400).send(err);
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const user_id = req.params.id;

  User.destroy({
    where: { user_id: user_id }
  })
  .then(num => {
    if (num == 1) {
      res.status(200).send({
        message: "User deleted"
      });
    } else { // Code should not reach here
      res.status(500).send({
        message: `Cannot delete member with user_id=${user_id}. Maybe member was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Member with id=" + user_id
    });
  });
};
