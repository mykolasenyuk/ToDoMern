const { Todo } = require('../../models')

const getAllTodos = async (req, res, next) => {
    try {
        const result = await Todo.find({}, '_id title description isDone')
        res.status(200).json({
            result
        })
    } catch (error) {
        next(error)
    }
}
module.exports = getAllTodos
