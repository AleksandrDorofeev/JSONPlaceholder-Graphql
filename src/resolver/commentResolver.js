const { getAllComments, getOneComment } = require("../controllers/comment.controller");

const commentResolver = {
  Query: {
    comments: getAllComments,
    comment: (_, {id}) => getOneComment(id)
  }
};

module.exports = commentResolver;
