'use strict';
module.exports = function(sequelize, DataTypes) {
  var subjects = sequelize.define('subjects', {
    category: DataTypes.STRING,
    object_name: DataTypes.STRING,
    image_link: DataTypes.STRING(2068)
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        subjects.hasMany(models.comments);
      }
    }
  });
  return subjects;
};