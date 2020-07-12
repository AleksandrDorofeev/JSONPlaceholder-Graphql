const { getAllPosts, getOnePost, getPostComments, createPost } = require("../controllers/post.controller");

const postResolver = {
  Query: {
    posts: getAllPosts,
    post: (_, { id }) => getOnePost(id),
  },
  Mutation: {
    createPost: (_, {input}) => createPost(input)
  },
  Post: {
    comments: ({id}) => getPostComments(id)
  }
};

module.exports = postResolver;
