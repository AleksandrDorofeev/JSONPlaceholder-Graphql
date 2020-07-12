const { todos } = require("../../data/todos");

function getAllTodos() {
  return todos;
}

function getOneTodo(id) {
  let oneTodo = todos.find((todo) => todo.id == id);
  if (oneTodo !== undefined) {
    return {
      __typename: "Todo",
      ...oneTodo,
    };
  }
  return {
    __typename: "TodoNotFound",
    error: "Error",
    message: `Todo with the id ${id} not exists`,
  };
}

module.exports = {
  getAllTodos,
  getOneTodo,
};
