const { gql } = require("apollo-server-express");

const root = gql`
  interface Error {
    error: String!
  }

  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;

module.exports = root;
