'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts','content', {
      type: Sequelize.JSON,
      allowNull: false,
    })

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('posts','content')
  }
};
