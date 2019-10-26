'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    captainId: DataTypes.STRING,
    teamName: DataTypes.STRING,
    player: DataTypes.STRING,
    captainApproved: DataTypes.BOOLEAN,
    playerApproved: DataTypes.BOOLEAN,
    image: DataTypes.TEXT
  }, {});
  Team.associate = function(models) {
    // associations can be defined here
  };
  return Team;
};