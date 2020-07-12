const { comments } = require("../../data/comments");

function getAllComments() {
  return comments;
}

function getOneComment(id) {
  let oneComment = comments.find((comment) => comment.postId == id);
  if (oneComment !== undefined) {
    return {
      __typename: "Comment",
      ...oneComment,
    };
  }
  return {
    __typename: "CommentNotFound",
    error: "Error",
    message: `Comment with the id ${id} not exists`,
  };
}

module.exports = {
  getAllComments,
  getOneComment,
};
