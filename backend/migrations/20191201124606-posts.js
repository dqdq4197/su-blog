'use strict';

module.exports = {
  
   up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('posts','author', {
      type: Sequelize.STRING(15),
      allowNull: false,
    })

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.removeColomn('posts','author');
    
  }
};
