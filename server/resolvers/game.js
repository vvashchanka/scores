import { combineResolvers } from "graphql-resolvers";

import { isAuthenticated } from "./authorization";

export default {
  Query: {
    games: async (user, args, { models }) => await models.Game.findAll()
  },

  Mutation: {}
};
