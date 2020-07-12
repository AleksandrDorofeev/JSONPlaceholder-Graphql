const { createTestClient } = require("apollo-server-testing");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const typeDefs = require("../schema");
const resolvers = require("../resolver");

const GET_ALL_COMMENTS = gql`
  query GetAllComments {
    comments {
      postId
      id
      name
      email
      body
    }
  }
`;

const GET_ONE_COMMENT = gql`
  query GetOneComment($id: ID!) {
    comment(id: $id) {
      ... on CommentNotFound {
        error
        message
      }
      ... on Comment {
        postId
        id
        name
        email
        body
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
  const server = new ApolloServer({ schema });
  return { server };
};

describe("[testing photo queries]", () => {
  it("GET_ALL_COMMENTS", async () => {
    const { server } = constructServer();
    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_COMMENTS,
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_COMMENT with existing comment", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_COMMENT,
      variables: { id: 1 },
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_COMMENT with not existing comment", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_COMMENT,
      variables: { id: 1000 },
    });

    expect(res).toMatchSnapshot();
  });
});
