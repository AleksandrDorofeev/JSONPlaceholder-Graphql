const root = require("./root");
const userSchema = require("./userSchema");
const todoSchema = require("./todoSchema");
const postSchema = require("./postSchema");
const photoSchema = require("./photoSchema");
const commentSchema = require("./commentSchema");
const albumSchema = require("./albumSchema");

const schemaArray = [
  root,
  userSchema,
  todoSchema,
  postSchema,
  photoSchema,
  commentSchema,
  albumSchema
];

module.exports = schemaArray;
