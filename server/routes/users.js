const router = require('express').Router();
const {User, Team} = require ('../models/index');

//Get user data by Login
router.get('/', async (req, res) => {
    const {login} = req.query;
    const userData = await User.findOne({where: {login}});
    res.send(userData.dataValues);
});

//Confirm players request to join team
router.put('/confirm', async (req,res) => {
    await Team.findOne({ where: { teamName: req.body.team } })
        .then(team => team.update({
            captainApproved: true,
            playerApproved: true
        }))
        .then(team => {
            res.send(team);
        })
        .catch(err => console.log(err));
});

//Get all players without team
router.get('/free', async (req,res) => {
    await User.findAll({ where: { teamName: null } })
        .then(players => res.send(players))
        .catch(err => console.log(err));
});


//Get player`s name by login
router.get('/player', async (req,res) => {
    await User.findOne({where: {login: req.query.login}})
        .then(user => {
            res.send(user.userName)
        })
        .catch(err => res.send(err))
});

//Send invite to player
router.post('/invite', async (req,res) => {
    const {userName, teamName} = req.body;
    const user = await User.findOne({ where: { userName } })
        .then(res => res.login)
        .catch(err => console.log(err));
    await Team.findOne({ where: { teamName } })
        .then(team => {
            team.update({
                player: user,
                captainApproved: true,
                playerApproved: false
            });
            return team;
        })
        .then(team => {
            res.send(team.dataValues)
        })
        .catch(err => console.log(err));
});

module.exports = router;