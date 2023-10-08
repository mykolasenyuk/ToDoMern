const { Todo } = require('../../models')

const addTodo = async (req, res, next) => {
    try {
        const newTodo = { ...req.body}
        const result = await Todo.create(newTodo)
        res.status(201).json({
            message: `✔ Todo added`,
                result,
        })
    } catch (error) {
        next(error)
    }
}
module.exports = addTodo
