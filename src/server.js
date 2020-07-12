const express = require("express");
const { ApolloServer, makeExecutableSchema } = require("apollo-server-express");
const cors = require("cors");
const dotenv = require("dotenv");
const typeDefs = require("./schema");
const resolvers = require("./resolver");

dotenv.config();

const PORT = process.env.PORT || 4000;

// start express server
const app = express();

// enable CORS
app.use(cors());

// middleware to parse json
app.use(express.json());

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

const apolloServer = new ApolloServer({
  schema,
});

apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
