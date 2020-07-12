const { gql } = require("apollo-server-express");

const albumSchema = gql`
  extend type Query {
    albums: [Album!]
    album(id: ID!): AlbumResult!
  }

  type Album {
    userId: ID!
    id: ID!
    title: String!
    photos: [Photo!]
  }

  type AlbumNotFound implements Error {
    error: String!
    message: String!
  }

  union AlbumResult = Album | AlbumNotFound
`;

module.exports = albumSchema;