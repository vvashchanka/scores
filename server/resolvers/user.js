const jwt = require('jsonwebtoken');
const combineResolvers = require('graphql-resolvers');
const { AuthenticationError, UserInputError } = require('apollo-server');

const isAuthenticated = require('./authorization');

const createToken = async (user, secret, expiresIn) => {
    const { login } = user;
    return await jwt.sign({ login }, secret, {
        expiresIn,
    });
};

module.exports = {
    Query: {
        users: async (parent, args, { models }) => {
            return await models.User.findAll();
        },
        //Get user data
        user: async (parent, { login, userName, teamName, isCaptain }, { models }) =>
            await models.User.findOne({where: {login, userName, teamName, isCaptain}}),
        me: async (parent, args, { models, me }) => {
            if (!me) {
                return null;
            }
            const { login } = me;

            return await models.User.findOne({where: {login}});
        },
    },

    Mutation: {
        signUp: async (
            parent,
            { username, email, password },
            { models, secret },
        ) => {
            const user = await models.User.create({
                username,
                email,
                password,
            });

            return { token: createToken(user, secret, '30m') };
        },

        signIn: async (
            parent,
            { login, password },
            { models, secret },
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

            return { token: createToken(user, secret, '30m') };
        },

        updateUser: combineResolvers(
            isAuthenticated,
            async (parent, { username }, { models, me }) => {
                const user = await models.User.findById(me.id);
                return await user.update({ username });
            },
        ),

        deleteUser: combineResolvers(
            isAdmin,
            async (parent, { id }, { models }) => {
                return await models.User.destroy({
                    where: { id },
                });
            },
        ),
    },

    User: {
        messages: async (user, args, { models }) => {
            return await models.Message.findAll({
                where: {
                    userId: user.id,
                },
            });
        },
    },
};

