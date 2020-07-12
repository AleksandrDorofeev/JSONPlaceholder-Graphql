const { gql } = require("apollo-server-express");

const commentSchema = gql`
  extend type Query {
    comments: [Comment!]
    comment(id: ID!): CommentResult!
  }

  type Comment {
    postId: ID!
    id: ID!
    name: String!
    email: String!
    body: String!
  }

  type CommentNotFound implements Error {
    error: String!
    message: String!
  }

  union CommentResult = Comment | CommentNotFound
`;

module.exports = commentSchema;