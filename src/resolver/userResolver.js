const {
  getAllUsers,
  getUsersTodos,
  getOneUser,
  getUserPosts,
  getUserAlbums,
} = require("../controllers/user.controller");

const userResolver = {
  Query: {
    users: getAllUsers,
    user: (_, { id }) => getOneUser(id),
  },
  User: {
    todos: ({ id }) => getUsersTodos(id),
    posts: ({ id }) => getUserPosts(id),
    albums: ({ id }) => getUserAlbums(id),
  },
};

module.exports = userResolver;
