module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    task_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Completed', 'Not Started', 'In Progress'],
      default: 'Not Started'
    },
    due_date: {
      type: DataTypes.DATE
    },
    priority: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5
      },
      defaultValue: 5
    }
  });
  return Task;
};