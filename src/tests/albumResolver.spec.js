const { createTestClient } = require("apollo-server-testing");
const {
  ApolloServer,
  makeExecutableSchema,
  gql,
} = require("apollo-server-express");

const typeDefs = require("../schema");
const resolvers = require("../resolver");

const GET_ALL_ALBUMS = gql`
  query GetAllAlbums {
    albums {
      userId
      id
      title
      photos {
        albumId
        title
        url
      }
    }
  }
`;

const GET_ONE_ALBUM = gql`
  query GetOneAlbum($id: ID!) {
    album(id: $id) {
      ... on AlbumNotFound {
        error
        message
      }
      ... on Album {
        userId
        id
        title
        photos {
          url
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

describe("[testing album queries]", () => {
  it("GET_ALL_ALBUMS", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ALL_ALBUMS,
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_ALBUM with existing album", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_ALBUM,
      variables: { id: 1 },
    });

    expect(res).toMatchSnapshot();
  });

  it("GET_ONE_ALBUM with not existing album", async () => {
    const { server } = constructServer();

    const { query } = createTestClient(server);

    const res = await query({
      query: GET_ONE_ALBUM,
      variables: { id: 999 },
    });

    expect(res).toMatchSnapshot();
  });
});
