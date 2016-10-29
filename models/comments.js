'use strict';
module.exports = function(sequelize, DataTypes) {
  var comments = sequelize.define('comments', {
    content: DataTypes.STRING(1000),
    rating: DataTypes.INTEGER,
    posted: DataTypes.DATE(6)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        comments.hasOne(models.users);
        comments.hasOne(models.subjects);
      }
    }
  });
  return comments;
};