const router = require('express').Router();
const {User, Team} = require ('../models/index');

router.post('/', async (req, res) => {
    const {teamName, id, image} = req.body;
    await Team.findOne({ where: { teamName } })
        .then(async team => {
            if (!team) {
                await User.findOne({ where: { id } })
                    .then(user => user.update({
                        isCaptain: true,
                        teamName
                    }));
                await Team.create({
                    teamName,
                    captainId: id,
                    image
                })
                    .then(team => {
                        res.send(team.dataValues);
                    })
                    .catch(err => console.log(err));
            } else {
                return res.status(400).send('Team name already exists');
            }
        })
        .catch(err => console.log(err));

});

router.get('/', async (req,res) => {
    if (req.query.id) {
        const {userId} = req.query;
        await Team.findOne({ where: { userId } })
            .then(team => {
                res.send(team.dataValues)
            });
    } else {
        await Team.findAll()
            .then(teams => res.send(teams))
            .catch(err => console.log(err));
    }

});

router.put('/join', async (req,res) => {
    const {player, teamName} = req.body;
    await Team.findOne({ where: { teamName } })
        .then(team => team.update({
            player,
            playerApproved: true
        }))
        .then(team => {
            res.send(team);
        })
        .catch(err => console.log(err));
    await User.findOne({ where: { login: player } })
        .then(user => user.update({
            teamName
        }))
        .catch(err => console.log(err));
});

router.delete('/', async (req,res) => {
    const { teamName, login } = req.query;
    await User.findOne({ where: { login: req.body.player } })
        .then(user => user.update({
            teamName: null
        }))
        .catch(err => console.log(err));
    await Team.destroy({ where: { teamName } })
        .then(team => {
            res.send('Team removed');
        })
        .catch(err => console.log(err));
    await User.findOne({ where: { login } })
        .then(user => user.update({
            isCaptain: false,
            teamName: null
        }))
        .catch(err => console.log(err));
});

router.put('/leave', async (req,res) => {
    const{teamName, login} = req.body;
    await Team.findOne({ where: { teamName } })
        .then(team => team.update({
            player: null,
            captainApproved: false,
            playerApproved: false
        }))
        .then(team => {
            res.send(team);
        })
        .catch(err => console.log(err));
    await User.findOne({ where: { login } })
        .then(user => user.update({
            teamName: null
        }))
        .catch(err => console.log(err));
});

router.put('/accept', async (req,res) => {
    const {player, teamName} = req.body;
    await Team.findOne({ where: { teamName } })
        .then(team => team.update({
            playerApproved: true
        }))
        .then(async team => {
            res.send(team);
            await Team.findAll({ where: { player, playerApproved: false } })
                .then(teams => teams.forEach(team => team.update({
                    player: null,
                    captainApproved: false
                })))
                .catch(err => console.log(err));
            await User.findOne({ where: { login: player } })
                .then(user => user.update({
                    teamName
                }))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));


});

router.put('/decline', async (req,res) => {
    const {player, teamName} = req.body;
    await User.findOne({ where: { login: player } })
        .then(user => user.update({
            teamName: null
        }))
        .catch(err => console.log(err));
    await Team.findOne({ where: { teamName} })
        .then(team => {
            team.update({
                player: null,
                captainApproved: false
            });
        })
        .then(team => {
            res.send('Invite declined')
        })
        .catch(err => console.log(err));
});

module.exports = router;