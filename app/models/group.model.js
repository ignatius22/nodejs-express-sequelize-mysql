module.exports = (sequelize, Sequelize) => {
 const Group = sequelize.define('group', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "title must not be empty" },
      },
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "description must not be empty" },
      },
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
      tableName: "groups",
      modelName: "Group",
    })
  return Group;
};
