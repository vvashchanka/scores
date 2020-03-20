const jwt = require('jsonwebtoken');
const combineResolvers = require('graphql-resolvers');
const {AuthenticationError, UserInputError} = require('apollo-server');

const isAuthenticated = require('./authorization');

const createToken = async ({login}, secret, expiresIn) => await jwt.sign({login}, secret, {
    expiresIn,
});

module.exports = {
    Query: {
        user: async (parent, {login, teamName, isCaptain = false}, {models}) =>
            await models.User.findOne({where: {login, teamName, isCaptain}}),
        me: async (parent, args, {models, me}) => {
            if (!me) {
                return null;
            }
            const {login} = me;

            return await models.User.findOne({where: {login}});
        },
    },

    Mutation: {
        signUp: async (
            parent,
            {username, login, password},
            {models, secret},
        ) => {
            const user = await models.User.create({
                username,
                login,
                password,
            });

            return {token: createToken(user, secret, '30m')};
        },

        signIn: async (
            parent,
            {login, password},
            {models, secret},
        ) => {
            const user = await models.User.findByLogin(login);

            if (!user) {
                throw new UserInputError(
                    'No user found with this login credentials.',
                );
            }

            const isValid = await user.validatePassword(password);

            if (!isValid) {
                throw new AuthenticationError('Invalid password.');
            }

            return {token: createToken(user, secret, '30m')};
        }
    },

    User: {
        team: async (user, args, {models}) => {
            return await models.Team.findOne({
                where: {
                    userId: user.id,
                },
            });
        },
        teams: async (user, args, {models}) => {
            return await models.Team.findAll();
        },
    },
};

