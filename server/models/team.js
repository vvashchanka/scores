'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    captainId: DataTypes.INTEGER,
    teamName: DataTypes.STRING,
    playerId: DataTypes.INTEGER,
    captainApproved: DataTypes.BOOLEAN,
    playerApproved: DataTypes.BOOLEAN,
    image: DataTypes.TEXT
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};