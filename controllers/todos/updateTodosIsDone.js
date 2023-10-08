const { Todo } = require('../../models')

const updateIsDone = async (req, res, next) => {
    try {
        const { todoId } = req.params
        const todo= { todoId }
        const { isDone } = req.body

        if (isDone === undefined) {
            return res.status(400).json({
                message: 'missing field isDone',
            })
        }
        const result = await Todo.findByIdAndUpdate(
            todo.todoId,
            { isDone },
            {
                new: true,
            },
        )
        if (!result) {
            res.status(404).json({
                message: `Todo with ID=${todoId} not found`,
            })
        }
        res.status(200).json({
            message: '✔️ Todo isDone updated',
            result
        })
    } catch (error) {
        next(error)
    }
}

module.exports = updateIsDone