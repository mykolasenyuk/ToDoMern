const { Todo } = require('../../models')

const deleteTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params
        const todo= { todoId }
        const result = await Todo.findByIdAndDelete(todo.todoId)
        if (!result) {
            res.status(404).json({
                message: `Todo with ID=${todo.todoId} not found`,
            })
            return
        }
        res.status(200).json({
            message: ' ✔️ Todo deleted',
            todoId,
        })
    } catch (error) {
        next(error)
    }
}
module.exports = deleteTodo
