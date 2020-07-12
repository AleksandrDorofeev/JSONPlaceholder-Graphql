const { createTestClient } = require("apollo-server-testing");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const typeDefs = require("../schema");
const resolvers = require("../resolver");

const GET_ALL_PHOTOS = gql`
  query GetAllPhotos {
    photos {
      albumId
      id
      title
      url
      thumbnailUrl
    }
  }
`;

const GET_ONE_PHOTO = gql`
  query GetOnePhoto($id: ID!) {
    photo(id: $id) {
      ... on PhotoNotFound {
        error
        message
      }
      ... on Photo {
        albumId
        id
        title
        url
        thumbnailUrl
      }
    }
  }
`;

const constructTestServer = () => {
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

describe("[testing photo queries]", () => {
  it("GET_ALL_PHOTOS", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_PHOTOS,
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_PHOTO with existing photo", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_PHOTO,
      variables: { id: 5 },
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_PHOTO with not existing photo", async () => {
    const { server } = constructTestServer();
    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_PHOTO,
      variables: { id: 500 },
    });

    expect(res).toMatchSnapshot();
  });
});
