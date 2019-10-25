const router = require('express').Router();
const {User, Team, Games} = require ('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerSchema, loginSchema} = require('../helpers/validation');

router.get('/user', async (req, res) => {
    const {login} = req.query;
    const userData = await User.findOne({where: {login}});
    res.send(userData.dataValues);
});

router.post('/register', async (req, res) => {
    const {error} = registerSchema.validate(req.body);
    if(error) {
        console.log(error.message);
        const msg = error.details ? error.details[0].message : error.message;
        return res.status(400).send(msg);
    }
    const loginExist = await User.findOne({where: {login: req.body.login}});

    if(loginExist) return res.status(400).send('Login already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.create({
        userName: req.body.name,
        login: req.body.login,
        password: hashedPassword
    })
        .then(user => res.send(user))
        .catch(err => console.log(err))
});

router.post('/login', async (req, res) => {
    const {error} = loginSchema.validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const user = await User.findOne({where: {login: req.body.login}});

    if(!user) return res.status(400).send('Login not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(403).send('Wrong password');

    const token = jwt.sign({login: user.login}, process.env.TOKEN_SECRET);

    res.header('authToken', token).send(`Welcome, ${user.name}!`);
});

router.post('/teams', async (req,res) => {
    await Team.findOne({ where: { userId: req.query.id } })
        .then(team => {
        res.send(team.dataValues)
    });
});



router.get('/teams', async (req,res) => {
        await Team.findAll()
            .then(teams => res.send(teams))
            .catch(err => console.log(err));
});


router.post('/team', async (req, res) => {
    await Team.findOne({ where: { teamName: req.body.name } })
        .then(team => {
            if (!team) {
                User.findOne({ where: { id: req.body.id } })
                    .then(user => user.update({
                        isCaptain: true,
                        teamName: req.body.name
                    }));
                Team.create({
                    teamName: req.body.name,
                    captainId: req.body.id
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

router.put('/team/join', async (req,res) => {
    await Team.findOne({ where: { teamName: req.body.team } })
        .then(team => team.update({
        player: req.body.player,
            playerApproved: true
    }))
        .then(team => {
            res.send(team);
        })
        .catch(err => console.log(err));
    await User.findOne({ where: { login: req.body.player } })
        .then(user => user.update({
            teamName: req.body.team
        }))
        .catch(err => console.log(err));
});

router.put('/player/confirm', async (req,res) => {
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

router.get('/players', async (req,res) => {
    await User.findAll({ where: { teamName: null } })
        .then(players => res.send(players))
        .catch(err => console.log(err));
});

router.put('/teams/accept', async (req,res) => {

    await Team.findOne({ where: { teamName: req.body.team } })
        .then(team => team.update({
            playerApproved: true
        }))
        .then(async team => {
            res.send(team);
            await Team.findAll({ where: { player: req.body.player, playerApproved: false } })
                .then(teams => teams.forEach(team => team.update({
                    player: null,
                    captainApproved: false
                })))
                .catch(err => console.log(err));
            await User.findOne({ where: { login: req.body.player } })
                .then(user => user.update({
                    teamName: req.body.team
                }))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));


});

router.put('/teams/decline', async (req,res) => {
    const {player, team} = req.body;
    await User.findOne({ where: { login: player } })
        .then(user => user.update({
            teamName: null
        }))
        .catch(err => console.log(err));
    await Team.findOne({ where: { teamName: team } })
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

router.get('/invites', async (req,res) => {
    await Team.findAll({ where: { player: req.body.team, playerApproved: false } })
        .then(teams => res.send(teams))
        .catch(err => console.log(err));
});

router.get('/player', async (req,res) => {
    await User.findOne({where: {login: req.query.login}})
        .then(user => {
            res.send(user.userName)
        })
        .catch(err => res.send(err))
});

router.post('/invite', async (req,res) => {
    const user = await User.findOne({ where: { userName: req.body.player } })
        .then(res => res.login)
        .catch(err => console.log(err));
    await Team.findOne({ where: { teamName: req.body.team } })
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

router.delete('/team', async (req,res) => {
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

router.put('/team/leave', async (req,res) => {
    await Team.findOne({ where: { teamName: req.body.team } })
        .then(team => team.update({
            player: null,
            captainApproved: false,
            playerApproved: false
        }))
        .then(team => {
            res.send(team);
        })
        .catch(err => console.log(err));
    await User.findOne({ where: { login: req.body.login } })
        .then(user => user.update({
            teamName: null
        }))
        .catch(err => console.log(err));
});

router.get('/games', async (req,res) => {
    if (Object.keys(req.query).length) {
        await Games.findAll({ where: {team2: req.query.team, approved: false}})
            .then(games => res.send(games)
            )
            .catch(err => console.log(err))
    } else {
        await Games.findAll()
            .then(games => res.send(games))
            .catch(err => console.log(err));
    }
});

router.post('/game', (req, res) => {
    Games.create({
        team1: req.body.team1,
        team2: req.body.team2,
        score1: req.body.score1,
        score2: req.body.score2,
        approved: false
    })
        .then(game => res.send(game))
        .catch(err => console.log(err))
});

router.put('/game', (req, res) => {
    Games.findOne({ where: {id: req.body.id}})
        .then(game => {
            game.update({
                approved: true
            });
            res.send('Game confirmed');
        })
        .catch(err => console.log(err))
});

router.delete('/game', (req, res) => {
    Games.destroy({ where: {id: req.query.id}})
        .then(() => res.send('Score deleted'))
        .catch(err => console.log(err))
});

module.exports = router;