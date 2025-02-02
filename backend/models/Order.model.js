module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("Order", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending',
      },
      paymentIntentId: {
        type: DataTypes.STRING,
        // Remove unique constraint
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
  
    // Define associations
    Order.associate = (models) => {
      Order.hasMany(models.OrderItem, {
        foreignKey: 'orderId',
        as: 'items'
      });
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user'
      });
    };
  
    return Order;
  };
  