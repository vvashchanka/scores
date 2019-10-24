const Sequelize = require('sequelize');

const db = require('./config/database');

const Teams = db.define('teams', {
    teamName: {
        type: Sequelize.STRING,
        unique: true
    },
    player: {
        type: Sequelize.STRING
    },
    captainApproved: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    playerApproved: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    }
});

const Users = db.define('users', {
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    userName: {
        type: Sequelize.STRING
    },
    login: {
        type: Sequelize.STRING,
        unique: true
    },
    teamName: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    isCaptain: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    }
});

const Games = db.define('games', {
    team1: {
        type: Sequelize.STRING
    },
    team2: {
        type: Sequelize.STRING
    },
    score1: {
        type: Sequelize.STRING
    },
    score2: {
        type: Sequelize.STRING,
        default: ''
    },
    approved: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    createdAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Sequelize.NOW
    }
});


    Teams.belongsTo(Users, {
        constraints: false
    });
    Users.hasOne(Teams, {
        constraints: false
    });



module.exports = {Users, Teams, Games};