module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("OrderItem", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      }
    });
    return OrderItem;
  };
  