const { Sequelize, DataTypes } = require("sequelize");
// Create Sequelize connection
// const mysqlConfig=require("../config")
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const db = {};
db.sequelize = sequelize;

db.User = require("./User.model")(sequelize, DataTypes);
db.Products = require("./Product.model")(sequelize, DataTypes);

db.User.hasMany(db.Products, {
  foreignKey: "userId",
  as: "Products",
});

db.Products.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

db.sequelize.sync();
db.sequelize.sync({alter :true})
module.exports = db;
