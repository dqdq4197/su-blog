'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('comments', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    postId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'posts',
        key: 'id'
      },
    },
    author: {
      type:Sequelize.STRING(50),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT(),
      allowNull: false,
    },
    parent: {
        type: Sequelize.INTEGER(),
        allowNull: true,
    },
    seq: {
        type: Sequelize.INTEGER(),
        allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('comments');
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
