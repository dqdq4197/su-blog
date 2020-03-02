'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'users',
        'skills',
        {
          type: Sequelize.STRING
        }
      ),
      queryInterface.addColumn(
        'users',
        'intro',
        {
          type: Sequelize.STRING
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('users', 'skills'),
      queryInterface.removeColumn('users', 'intro')
    ]);
  }
};