'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    login: DataTypes.STRING,
    password: DataTypes.STRING,
    teamName: DataTypes.STRING,
    isCaptain: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};