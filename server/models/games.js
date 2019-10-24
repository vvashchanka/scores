'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Games', {
    team1: DataTypes.STRING,
    team2: DataTypes.STRING,
    score1: DataTypes.STRING,
    score2: DataTypes.STRING,
    approved: DataTypes.BOOLEAN
  }, {});
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};