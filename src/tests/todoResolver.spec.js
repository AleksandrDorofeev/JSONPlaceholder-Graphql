const { createTestClient } = require("apollo-server-testing");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const typeDefs = require("../schema");
const resolvers = require("../resolver");

const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos {
      userId
      id
      title
      completed
    }
  }
`;

const GET_ONE_TODO = gql`
  query GetOneTodo($id: ID!) {
    todo(id: $id) {
      ... on TodoNotFound {
        error
        message
      }
      ... on Todo {
        userId
        id
        title
        completed
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

describe("[testing todo queries]", () => {
  it("GET_ALL_TODOS", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_TODOS,
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_TODO with existing todo", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_TODO,
      variables: { id: 1 },
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_TODO with not existing todo", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_TODO,
      variables: { id: 999 },
    });

    expect(res).toMatchSnapshot();
  });
});
