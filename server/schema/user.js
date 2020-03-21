import { gql } from "apollo-server-express";

export default gql`
  type Query {
    user(login: String, teamName: String, isCaptain: Boolean): User
    me: User
  }

  type Mutation {
    signUp(userName: String!, login: String!, password: String!): Token!

    signIn(login: String!, password: String!): Token!

    invite(userName: String, teamName: String): String!
  }

  type Token {
    token: String!
  }

  type User {
    userName: String!
    login: String!
    teamName: String
    isCaptain: String
  }
`;
