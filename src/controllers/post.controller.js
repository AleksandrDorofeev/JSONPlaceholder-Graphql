const { posts } = require("../../data/posts");
const { comments } = require("../../data/comments");

function getAllPosts() {
  return posts;
}

function getOnePost(id) {
  const onePost = posts.find((post) => post.id == id);
  if (onePost !== undefined) {
    return {
      __typename: "Post",
      ...onePost,
    };
  }
  return {
    __typename: "PostNotFound",
    error: "Error",
    message: `Post with the id ${id} not exists`,
  };
}

function getPostComments(id) {
  return comments.filter((comment) => comment.postId === id);
}

function createPost(input) {
  let id = "654321";
  const post = { ...input, id: id };
  posts.push(post);
  return post;
}

module.exports = {
  getAllPosts,
  getOnePost,
  getPostComments,
  createPost,
};
