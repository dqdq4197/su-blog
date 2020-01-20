'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    postId: DataTypes.INTEGER,
    author: DataTypes.STRING,
    content: DataTypes.STRING,
    parent: DataTypes.INTEGER,
    seq: DataTypes.INTEGER
  }, {});
  comment.associate = function(models) {
    // associations can be defined here
    comment.belongsTo(models.post, {
      foreignKey: "postId"
    })
  };
  return comment;
};