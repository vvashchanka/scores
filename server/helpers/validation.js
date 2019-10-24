const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
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

module.exports = {loginSchema, registerSchema};