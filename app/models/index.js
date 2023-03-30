const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Group = require("./group.model.js")(sequelize, Sequelize);
db.User = require("./user.model.js")(sequelize, Sequelize);


db.Group.belongsToMany(db.User, {
  through: "user_group",
  as: "users",
  foreignKey: "group_id",
});
db.User.belongsToMany(db.Group, {
  through: "user_group",
  as: "groups",
  foreignKey: "user_id",
});



module.exports = db;
