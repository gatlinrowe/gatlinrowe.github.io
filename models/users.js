'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING.BINARY
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        users.hasMany(models.comments);
        users.hasMany(models.subjects);
      }
    }
  });
  return users;
};