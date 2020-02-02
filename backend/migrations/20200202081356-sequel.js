'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','key_verify')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','verify')
  }
};
