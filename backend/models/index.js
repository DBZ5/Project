const { Sequelize, DataTypes } = require("sequelize");
// Create Sequelize connection
// const mysqlConfig=require("../config")
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});

const db = {};
db.sequelize = sequelize;

// Initialize models
db.User = require("./User.model")(sequelize, DataTypes);
db.Products = require("./Product.model")(sequelize, DataTypes);
db.Favorite = require("./Wishlist.model")(sequelize, DataTypes);
db.BestSelling = require("./bestSelling.model")(sequelize, DataTypes);
db.AllProducts = require("./allProducts.models")(sequelize, DataTypes);
db.Order = require("./Order.model")(sequelize, DataTypes);
db.OrderItem = require("./OrderItem.model")(sequelize, DataTypes);


// User - Product relationship (for products created by users/sellers)
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

// User - Favorite - Product relationships (for wishlisted products)
db.User.hasMany(db.Favorite, {
  foreignKey: 'userId',
  as: 'favorites'
});

db.Products.hasMany(db.Favorite, {
  foreignKey: 'productId',
  as: 'favorites'
});

db.Favorite.belongsTo(db.User, {
  foreignKey: 'userId',
  as: 'user'
});

db.Favorite.belongsTo(db.Products, {
  foreignKey: 'productId',
  as: 'product'
});


// Remove the duplicate sync calls and use only one
// Use force: false to prevent dropping tables
db.sequelize.sync({ force: true , alter: true } )
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });

module.exports = db;
