const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: "localhost",
    dialect: "mysql",
    logging: console.log
  }
);

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};
db.sequelize = sequelize;

// Initialize models
db.User = require("./User.model")(sequelize, DataTypes);
db.Products = require("./Product.model")(sequelize, DataTypes);
db.Favorite = require("./Wishlist.model")(sequelize, DataTypes);
db.BestSelling = require("./bestSelling.model")(sequelize, DataTypes);
db.AllProducts = require("./allProducts.models")(sequelize, DataTypes);

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

// Sync all models with the database
sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
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
