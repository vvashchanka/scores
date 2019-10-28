const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    userName: Joi.string().min(6).required(),
    login: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    confirmedPassword: Joi.string().min(6).required().valid(Joi.ref('password'))
        .error(new Error('Check password confirmation field'))
});

const loginSchema = Joi.object({
    login: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
        .error(new Error('Wrong password'))
});

const teamSchema = Joi.object({
    teamName: Joi.string().min(1).max(15).required()
        .error(new Error('Team name must be 1-15 characters')),
    image: Joi.string(),
    id: Joi.number().required()
});

const gameSchema = Joi.object({
    team1: Joi.string().required(),
    team2: Joi.string().required(),
    score1: Joi.number().required(),
    score2: Joi.number().required(),
    date: Joi.string().required()
});

module.exports = {loginSchema, registerSchema, teamSchema, gameSchema};