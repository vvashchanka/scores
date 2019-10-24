'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: DataTypes.STRING,
    login: DataTypes.STRING,
    teamName: DataTypes.STRING,
    password: DataTypes.STRING,
    isCaptain: DataTypes.BOOLEAN
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};


