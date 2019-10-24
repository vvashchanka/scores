'use strict';
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define('Games', {
    team1: DataTypes.STRING,
    team2: DataTypes.STRING,
    score1: DataTypes.STRING,
    score2: DataTypes.STRING,
    approved: DataTypes.BOOLEAN,
    date: DataTypes.DATE
  }, {});
  Games.associate = function(models) {
    // associations can be defined here
  };
  return Games;
};