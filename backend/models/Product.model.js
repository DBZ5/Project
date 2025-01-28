module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        description: {
          type: DataTypes.TEXT,
          allowNull: false
        },
      }
    );
    return Product
}