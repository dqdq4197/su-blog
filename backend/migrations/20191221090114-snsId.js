'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users','snsId', {
      type: Sequelize.STRING(30),
      allowNull: true,
    })

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColomn('users','snsId');
    
  }
};
