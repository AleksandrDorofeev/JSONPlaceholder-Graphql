const { getAllTodos, getOneTodo } = require("../controllers/todo.controller");

const todoResolver = {
  Query: {
    todos: getAllTodos,
    todo: (_, { id }) => getOneTodo(id),
  },
};

module.exports = todoResolver;
