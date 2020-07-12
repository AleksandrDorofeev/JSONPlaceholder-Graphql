const { gql } = require("apollo-server-express");

const UserSchema = gql`
  extend type Query {
    users: [User!] 
    user(id: ID!): UserResult!
  }

  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    address: Address!
    phone: String!
    website: String!
    company: Company!
    todos: [Todo!]
    posts: [Post!]
    albums: [Album!]
  }

  type Address {
    street: String!
    suite: String!
    city: String!
    zipcode: String!
    geo: Geo!
  }

  type Geo {
    lat: String!
    lng: String!
  }

  type Company {
    name: String!
    catchPhrase: String!
    bs: String!
  }

  type UserNotFound implements Error {
    error: String!
    message: String!
  }

  union UserResult = User | UserNotFound
`;

module.exports = UserSchema;