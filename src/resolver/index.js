const userResolver = require("./userResolver");
const todoResolver = require("./todoResolver");
const postResolver = require("./postResolver");
const photoResolver = require("./photoResolver");
const commentResolver = require("./commentResolver");
const albymResolver = require("./albumResolver");

const resolverArray = [
  userResolver,
  todoResolver,
  postResolver,
  photoResolver,
  commentResolver,
  albymResolver,
];

module.exports = resolverArray;
