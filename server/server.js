import express from "express";
import dotenv from "dotenv";
import cors from "cors";
const db = require("./models/");
import config from "config";
import http from "http";
import jwt from "jsonwebtoken";
import { ApolloServer, AuthenticationError } from "apollo-server-express";
const port = config.get("server.port");

const { User, Team, Game } = require("./models/index");
import schema from "./schema";
import resolvers from "./resolvers";

dotenv.config();
const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(cors());

const models = { User, Team, Game };

const getMe = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, config.get("secret"));
    } catch (e) {
      throw new AuthenticationError("Your session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        me,
        secret: config.get("secret")
      };
    }
  }
});

server.applyMiddleware({ app, path: "/graphql" });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

//Connect to database
db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
    //start server
    httpServer.listen({port}, () => {
      console.log(`Apollo Server on http://localhost:${port}/graphql`);
    });
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });
