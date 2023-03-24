module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define("Tag", {
    tag_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(6),
      default: "ffffff"
    },
  });
  return Tag;
};