const { gql } = require("apollo-server-express");

const photoSchema = gql`
  extend type Query {
    photos: [Photo!]
    photo(id: ID!): PhotoResult!
  }

  type Photo {
    albumId: ID!
    id: ID!
    title: String!
    url: String!
    thumbnailUrl: String!
  }

  type PhotoNotFound implements Error {
    error: String!
    message: String! 
  }

  union PhotoResult = Photo | PhotoNotFound
`;

module.exports = photoSchema;
