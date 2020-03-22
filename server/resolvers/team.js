import { Op } from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import { ValidationError } from "apollo-server";

import { isAuthenticated } from "./authorization";

export default {
  Query: {
    teams: async (user, args, { models }) => await models.Team.findAll()
  },

  Mutation: {
    confirm: combineResolvers(
      isAuthenticated,
      async (parent, { team }, { models, me }) =>
        await models.Team.update(
          {
            captainApproved: true,
            playerApproved: true
          },
          {
            where: { teamName: team }
          }
        )
    ),
    create: combineResolvers(
      isAuthenticated,
      async (parent, { teamName, id, image }, { models, me }) => {
        const team = await models.Team.findOne({ where: { teamName } });
        if (team) throw new ValidationError("Team already exists");
        await models.User.update(
          {
            isCaptain: true,
            teamName
          },
          { where: { id } }
        );
        return await models.Team.create({
          teamName,
          captainId: id,
          image
        });
      }
    ),
    join: combineResolvers(
      isAuthenticated,
      async (parent, { player, teamName }, { models, me }) => {
        const user = await models.User.update(
          {
            teamName
          },
          { where: { login: player } }
        );
        return await models.Team.update(
          {
            playerId: user.id,
            playerApproved: true
          },
          { where: { teamName } }
        );
      }
    ),
    delete: combineResolvers(
      isAuthenticated,
      async (parent, { teamName }, { models, me }) => {
        const team = await models.User.findOne({ where: { teamName } });
        const users = [];
        users.push(team.captainId, team.playerId);
        for await (const userId of users) {
          await models.User.update(
            {
              isCaptain: false,
              teamName: null
            },
            { where: { id: userId } }
          );
        }
        await models.Team.destroy({ where: { teamName } });
        return "success";
      }
    ),
    leave: combineResolvers(
      isAuthenticated,
      async (parent, { teamName, login }, { models, me }) => {
        const team = await models.Team.update(
          {
            playerId: null,
            captainApproved: false,
            playerApproved: false
          },
          { where: { teamName } }
        );
        await models.User.update(
          {
            teamName: null
          },
          { where: { login } }
        );
        return team;
      }
    ),
    accept: combineResolvers(
      isAuthenticated,
      async (parent, { player, teamName }, { models, me }) => {
        const team = await models.Team.update(
          {
            playerApproved: true
          },
          { where: { teamName } }
        );
        const otherTeams = await models.Team.findAll({
          where: { teamName: { [Op.not]: teamName } }
        });
        for await (const team of otherTeams) {
          team.update({
            playerId: null,
            captainApproved: false
          });
        }
        await models.User.update(
          {
            teamName
          },
          { where: { login: player } }
        );
        return team;
      }
    ),
    /*decline: combineResolvers(
      isAuthenticated,
      async (parent, { teamName, login }, { models, me }) => {}
    )*/
  }
};
