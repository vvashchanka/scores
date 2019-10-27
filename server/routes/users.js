const router = require('express').Router();
const {User, Team} = require ('../models/index');

router.get('/', async (req, res) => {
    const {login} = req.query;
    const userData = await User.findOne({where: {login}});
    res.send(userData.dataValues);
});

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

router.get('/free', async (req,res) => {
    await User.findAll({ where: { teamName: null } })
        .then(players => res.send(players))
        .catch(err => console.log(err));
});
/*
router.get('/invites', async (req,res) => {
    await Team.findAll({ where: { player: req.body.team, playerApproved: false } })
        .then(teams => res.send(teams))
        .catch(err => console.log(err));
});*/

router.get('/player', async (req,res) => {
    await User.findOne({where: {login: req.query.login}})
        .then(user => {
            res.send(user.userName)
        })
        .catch(err => res.send(err))
});

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