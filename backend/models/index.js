const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

var connected = false, callbackList = [];
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, DataTypes);
db.tasks = require("./task.model.js")(sequelize, DataTypes);
db.tags = require("./tag.model.js")(sequelize, DataTypes);


db.tags.belongsToMany(db.tasks, { through: 'TagTasks' });
db.tags.belongsTo(db.users);

db.tasks.belongsToMany(db.tags, { through: 'TagTasks' });
db.tasks.belongsTo(db.users);

module.exports = db;