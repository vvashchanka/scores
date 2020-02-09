const router = require('express').Router();
const {User} = require ('../models/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('../helpers/verifyToken');

//Check if user token is correct
router.get('/', verify, (req, res) => {
    res.send(req.user);
});

//Register new user
router.post('/register', async (req, res) => {
    const {login, userName} = req.body;
    const loginExist = await User.findOne({where: {login}});

    if(loginExist) return res.status(400).send('Login already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    User.create({
        userName,
        login,
        password: hashedPassword
    })
        .then(user => res.send(user))
        .catch(err => console.log(err))
});

//User login
router.post('/login', async (req, res) => {
    const user = await User.findOne({where: {login: req.body.login}});

    if(!user) return res.status(400).send('Login not found');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(403).send('Wrong password');

    const token = jwt.sign({login: user.login}, process.env.TOKEN_SECRET);

    res.header('authToken', token).send(`Welcome, ${user.name}!`);
});

module.exports = router;