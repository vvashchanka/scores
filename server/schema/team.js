import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    teams: Team
  }

  extend type Mutation {
    confirm(team: String!): Team

    create(teamName: String!, id: Int, image: String): Team

    join(player: String, teamName: String): Team
    
    delete(teamName: String!): String
    
    leave(teamName: String, login: String): Team
    
    accept(player: String, teamName: String): Team
  }

  type Team {
    captainId: Int
    teamName: String!
    playerId: Int
    captainApproved: Boolean
    playerApproved: Boolean
    image: String
  }
`;
