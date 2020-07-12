const { users } = require("../../data/users");
const { todos } = require("../../data/todos");
const { posts } = require("../../data/posts");
const { albums } = require("../../data/albums");

function getAllUsers() {
  return users;
}

function getOneUser(id) {
  let oneUser = users.find((user) => user.id == id);
  if (oneUser !== undefined) {
    return {
      __typename: "User",
      ...oneUser,
    };
  }
  return {
    __typename: "UserNotFound",
    error: "Error",
    message: `User with the id ${id} not exists`,
  };
}

function getUsersTodos(id) {
  return todos.filter((todo) => todo.userId === id);
}

function getUserPosts(id) {
  return posts.filter((post) => post.userId === id);
}

function getUserAlbums(id) {
  return albums.filter((album) => album.userId === id);
}

module.exports = {
  getAllUsers,
  getOneUser,
  getUsersTodos,
  getUserPosts,
  getUserAlbums,
};
