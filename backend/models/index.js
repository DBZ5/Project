const { Sequelize, DataTypes } = require("sequelize");
// Create Sequelize connection
// const mysqlConfig=require("../config")
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: "localhost",
  dialect: "mysql",
});



const db={}
db.sequelize =sequelize;

db.User=require("./User.model")(sequelize,DataTypes)
db.Products=require("./Product.model")(sequelize,DataTypes)
db.Wishlist = require("./Wishlist.model")(sequelize, DataTypes)


db.User.hasMany(db.Products, {
    foreignKey: 'userId',
    as: 'Products'
});
  
db.Products.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user'
});

db.User.belongsToMany(db.Products, { through: db.Wishlist });
db.Products.belongsToMany(db.User, { through: db.Wishlist });


db.sequelize.sync({ force: true })
    .then(() => {
        console.log('Database synchronized successfully');
    })
    .catch((error) => {
        console.error('Error synchronizing database:', error);
    });

module.exports = db