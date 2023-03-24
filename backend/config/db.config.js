module.exports = {
  HOST: "129.153.61.57",
  USER: "webapp",
  PASSWORD: "cs348user",
  DB: "cs348",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};