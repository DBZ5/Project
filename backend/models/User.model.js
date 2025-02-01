module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      "User",
      {
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: {
              msg: "Full name is required"
            }
          }
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            isEmail: {
              msg: "Please enter a valid email address"
            }
          },
          unique: {
            name: 'email',
            msg: 'Email address already in use'
          }
        },
        password: {
          type: DataTypes.STRING,
          allowNull: true
        },
        role: {
          type: DataTypes.ENUM,
          values: ['seller', 'user', 'admin'],
          defaultValue: 'user', 
          allowNull: false
        },
       
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
          allowNull: false
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null
        },
      },
      { 
        timestamps: true,
        indexes: [
          {
            unique: true,
            fields: ['email']
          }
        ]
      }
    );
    
    return User;
  };
  