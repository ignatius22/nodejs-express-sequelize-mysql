const { Model } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
     const User = sequelize.define('user', {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "firstname must not be empty" },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "lastname must not be empty" },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email must not be empty" },
          isEmail: { msg: "must be a valid email address" },
        },
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    },
    {
        sequelize,
        tableName: 'users',
        schema: 'public',
        timestamps: true,
      });

  User.associate = function(models) {
    User.belongsToMany(models.Group, {
      through: models.GroupUser,
      as: 'groups',
      foreignKey: 'userId'
    });
  };
    return User;
  };
  