'use strict';
module.exports = (sequelize, DataTypes) => {
  const p_like = sequelize.define('p_like', {
    u_Id: DataTypes.STRING
  }, {});
  p_like.associate = function(models) {
    // associations can be defined here
  };
  return p_like;
};