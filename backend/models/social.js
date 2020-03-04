'use strict';
module.exports = (sequelize, DataTypes) => {
  const social = sequelize.define('social', {
    git: DataTypes.STRING,
    facebook: DataTypes.STRING,
    twitter: DataTypes.STRING,
    home: DataTypes.STRING,
    instagram: DataTypes.STRING
  }, {});
  social.associate = function(models) {
    social.hasOne(models.user, {
      foreignKey: "userId"
    })
  };
  return social;
};