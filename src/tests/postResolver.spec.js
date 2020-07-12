const { createTestClient } = require("apollo-server-testing");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const typeDefs = require("../schema");
const resolvers = require("../resolver");

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    posts {
      userId
      id
      title
      body
      comments {
        postId
        id
        name
        email
        body
      }
    }
  }
`;

const GET_ONE_POST = gql`
  query GetOnePost($id: ID!) {
    post(id: $id) {
      ... on PostNotFound {
        error
        message
      }
      ... on Post {
        userId
        id
        title
        body
        comments {
          name
        }
      }
    }
  }
`;

const CREATE_POST = gql`
  mutation CreatePost($userId: ID!, $title: String!, $body: String!) {
    createPost(input: { userId: $userId, title: $title, body: $body }) {
      userId
      id
      title
      body
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

describe("[testing post queries]", () => {
  it("GET_ALL_POSTS", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_POSTS,
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_POST with existing post", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_POST,
      variables: { id: 1 },
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_POST with no existing post", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_POST,
      variables: { id: 999 },
    });

    expect(res).toMatchSnapshot();
  });

  it("CREATE_POST", async () => {
    const { server } = constructServer();

    const { mutate } = createTestClient(server);

    const res = await mutate({
      query: CREATE_POST,
      variables: { userId: 1, title: "testing title", body: "testing body" },
    });

    expect(res).toMatchSnapshot();
  });
});
