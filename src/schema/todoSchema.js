const {gql} = require("apollo-server-express");

const todoSchema = gql`
  extend type Query {
    todos: [Todo!]
    todo(id: ID!): TodoResult!
  }

  type Todo {
    userId: ID!
    id: ID!
    title: String
    completed: Boolean!
  }

  type TodoNotFound implements Error {
    error: String!
    message: String!
  }

  union TodoResult = Todo | TodoNotFound
`;

module.exports = todoSchema;