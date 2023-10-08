const { Todo } = require("../../models");

const getAllTodos = async (req, res, next) => {
  try {
    const results = await Todo.find({}, "_id title description isDone");
    res.status(200).json({
      results,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = getAllTodos;
