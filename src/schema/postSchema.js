const { gql } = require("apollo-server-express");

const postSchema = gql`
  extend type Query {
    posts: [Post!]
    post(id: ID!): PostResult!
  }

  input CreatePostInput {
    userId: ID!
    title: String!
    body: String!
  }

  extend type Mutation {
    createPost(input: CreatePostInput!): Post
  }

  type Post {
    userId: ID!
    id: ID!
    title: String!
    body: String!
    comments: [Comment!]
  }

  type PostNotFound implements Error {
    error: String!
    message: String!
  }

  union PostResult = Post | PostNotFound
`;

module.exports = postSchema;
