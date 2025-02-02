module.exports = (sequelize, DataTypes) => {
  const AllProducts = sequelize.define("AllProducts", {
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
    category: {
      type: DataTypes.ENUM,
      values: [
        "Men",
        "Women",
        "Electronics",
        "Home",
        "Beauty",
        "Sports",
      ],
      allowNull: true,
    },
  });
  return AllProducts;
};
