module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.ENUM('xs', 's', 'm', 'l', 'xl'),
      allowNull: true, // You can make it not null if you want
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Default to 0 if quantity is not provided
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false, // You can modify it based on your needs
    },
  });

  return Product;
};
