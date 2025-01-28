module.exports = (sequelize, DataTypes) => {
    const Wishlist = sequelize.define('Wishlist', {
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
    });
    return Wishlist;
}; 