const { createTestClient } = require("apollo-server-testing");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const typeDefs = require("../schema");
const resolvers = require("../resolver");

const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      name
      email
      address {
        street
        geo {
          lat
        }
      }
      company {
        name
      }
      todos {
        title
        completed
      }
      posts {
        userId
        title
        body
        comments {
          name
        }
      }
      albums {
        userId
        id
        title
        photos {
          albumId
          url
        }
      }
    }
  }
`;

const GET_ONE_USER = gql`
  query GetOneUser($id: ID!) {
    user(id: $id) {
      ... on UserNotFound {
        error
        message
      }
      ... on User {
        id
        name
        company {
          name
        }
      }
    }
  }
`;

const constructServer = () => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
    resolverValidationOptions: {
      requireResolversForResolveType: false,
    },
  });

  const server = new ApolloServer({
    schema,
  });

  return { server };
};

describe("[testing user queries]", () => {
  it("GET_ALL_USERS", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_USERS,
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_USER with existing user", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_USER,
      variables: { id: 1 },
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_USER with no existing user", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_USER,
      variables: { id: 999 },
    });

    expect(res).toMatchSnapshot();
  });
});
