import jwt from "jsonwebtoken";
import { combineResolvers } from "graphql-resolvers";
import { AuthenticationError, UserInputError } from "apollo-server";

import { isAuthenticated } from "./authorization";

const createToken = async ({ login }, secret, expiresIn) =>
  await jwt.sign({ login }, secret, {
    expiresIn
  });

export default {
  Query: {
    user: async (parent, { login, teamName, isCaptain = false }, { models }) =>
      await models.User.findOne({ where: { login, teamName, isCaptain } }),
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }
      const { login } = me;

      return await models.User.findOne({ where: { login } });
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { username, login, password },
      { models, secret }
    ) => {
      const user = await models.User.create({
        username,
        login,
        password
      });

      return { token: createToken(user, secret, "30m") };
    },

    signIn: async (parent, { login, password }, { models, secret }) => {
      const user = await models.User.findByLogin(login);

      if (!user) {
        throw new UserInputError("No user found with this login credentials.");
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError("Invalid password.");
      }

      return { token: createToken(user, secret, "30m") };
    },

    invite: combineResolvers(
      isAuthenticated,
      async (parent, { userName, teamName }, { models, me }) => {
        const user = await models.User.findOne({ where: { userName } });
        const team = await models.Team.findOne({ where: { teamName } });
        await team.update({
          player: user,
          captainApproved: true,
          playerApproved: false
        });
        return "success";
      }
    )
  },

  /*User: {
    team: async (user, args, { models }) =>
      await models.Team.findOne({
        where: {
          userId: user.id
        }
      })
  }*/
};
