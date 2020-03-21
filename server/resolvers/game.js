const { combineResolvers } = require("graphql-resolvers");

const { isAuthenticated } = require("./authorization");

module.exports = {
  Query: {
    games: async (user, args, { models }) => await models.Game.findAll()
  },

  Mutation: {}
};
