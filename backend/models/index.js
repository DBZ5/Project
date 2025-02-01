const { Sequelize, DataTypes } = require("sequelize");
// Create Sequelize connection
// const mysqlConfig=require("../config")
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;

db.User = require("./User.model")(sequelize, DataTypes);
db.Products = require("./Product.model")(sequelize, DataTypes);
db.BestSelling = require("./bestSelling.model")(sequelize, DataTypes);
db.AllProducts = require("./allProducts.models")(sequelize, DataTypes);

// Define associations
db.User.hasMany(db.Products, {
  foreignKey: "userId",
  as: "Products",
});

// db.BestSelling.belongsTo(db.User, {
//   foreignKey: "userId",
//   as: "user",
// });

db.Products.belongsTo(db.User, {
  foreignKey: "userId",
  as: "user",
});

// Remove the duplicate sync calls and use only one
// Use force: false to prevent dropping tables
db.sequelize.sync({ force: false } )
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

module.exports = db;
