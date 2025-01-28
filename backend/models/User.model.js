module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        UserName: {
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
          allowNull: false
        },
        createdOn: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        role: {
          type: DataTypes.ENUM,
          values: ['user', 'admin'],
          defaultValue: 'user', 
          allowNull: false
        }
      },
      { timestamps: true }
    );
    
    return User;
  };
  