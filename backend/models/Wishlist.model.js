module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    }
  }, {
    tableName: 'Favorites',
    timestamps: true
  });

  // Establish relationships
  Favorite.associate = (models) => {
    // A favorite belongs to one user
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      onDelete: 'CASCADE'
    });

    // A favorite belongs to one product
    Favorite.belongsTo(models.Products, {
      foreignKey: 'productId',
      as: 'product'
    });
  };

  return Favorite;
};