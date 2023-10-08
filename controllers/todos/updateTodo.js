const { Todo } = require('../../models')

const updateTodo = async (req, res, next) => {
    try {
        const { todoId } = req.params
        const todo= { todoId }
        const result = await Todo.findByIdAndUpdate(
            todo.todoId,
            req.body,
            {
                new: true,
            },
        )
        if (!result) {
            res.status(404).json({
                message: `Todo with ID=${todoId} not found`,
            })
            return
        }
        res.status(200).json({
            message: '✔️ Todo updated',
             result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = updateTodo