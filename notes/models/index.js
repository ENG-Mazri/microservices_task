const ndbConfig = require("../config/notedb.config.js");
const udbConfig = require("../config/userdb.config");
const Sequelize = require("sequelize");
const noteDB = new Sequelize(ndbConfig.DB, ndbConfig.USER, ndbConfig.PASSWORD, {
  host: ndbConfig.HOST,
  dialect: ndbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: ndbConfig.pool.max,
    min: ndbConfig.pool.min,
    acquire: ndbConfig.pool.acquire,
    idle: ndbConfig.pool.idle
  }
});
const userDB = new Sequelize(udbConfig.DB, udbConfig.USER, udbConfig.PASSWORD, {
  host: udbConfig.HOST,
  dialect: udbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: udbConfig.pool.max,
    min: udbConfig.pool.min,
    acquire: udbConfig.pool.acquire,
    idle: udbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.noteDB = noteDB;
db.userDB = userDB;
db.Note = require("./model.js")(noteDB,userDB, Sequelize);
console.log(db.userDB)
module.exports = db;