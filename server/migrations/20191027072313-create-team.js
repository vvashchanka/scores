'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      captainId: {
        type: Sequelize.INTEGER
      },
      teamName: {
        type: Sequelize.STRING
      },
      playerId: {
        type: Sequelize.INTEGER
      },
      captainApproved: {
        type: Sequelize.BOOLEAN
      },
      playerApproved: {
        type: Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Teams');
  }
};