const { Todo } = require('../../models')

const getTodoById = async (req, res, next) => {
    try {
        const { todoId } = req.params
        const todo = { todoId}
        const result = await Todo.findById(todo.todoId)
        if (!result) {
            res.status(404).json({
                status: 'error',
                message: `Todo with ID=${todo.todoId} not found`,
            })
            return
        }
        res.status(200).json({
            result
        })
    } catch (error) {
        next(error)
    }
}
module.exports = getTodoById
