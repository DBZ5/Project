module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },

        createdOn: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        role: {
          type: DataTypes.ENUM,
          values: ['seller','user', 'admin'],
          defaultValue: 'user', 
          allowNull: false
        }
      },
      { timestamps: true }
    );
    
    return User;
  };
  