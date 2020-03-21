const router = require('express').Router();
const {Games} = require ('../models/index');

//Get all games
router.get('/', async (req,res) => {
    if (Object.keys(req.query).length) {
        await Games.findAll({ where: {team2: req.query.team, approved: false}})
            .then(games => res.send(games)
            )
            .catch(err => console.log(err))
    } /*else {
        await Games.findAll()
            .then(games => res.send(games))
            .catch(err => console.log(err));
    }*/
});


//Create a new game
router.post('/', (req, res) => {
    const {team1, team2, score1, score2, date} = req.body;
    Games.create({
        team1, team2, score1, score2, date,
        approved: false
    })
        .then(game => res.send(game))
        .catch(err => console.log(err))
});

//Approve game results
router.put('/', (req, res) => {
    const{id} = req.body;
    Games.findOne({ where: {id}})
        .then(game => {
            game.update({
                approved: true
            });
            res.send('Game confirmed');
        })
        .catch(err => console.log(err))
});

//Decline and delete game result
router.delete('/', (req, res) => {
    const{id} = req.query;
    Games.destroy({ where: {id}})
        .then(() => res.send('Score deleted'))
        .catch(err => console.log(err))
});

module.exports = router;