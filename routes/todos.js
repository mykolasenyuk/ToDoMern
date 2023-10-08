const express = require('express')
const router = express.Router()
const { joiSchema, updateDoneSchema} = require('../models/todo')
const { validation} = require('../midlewares')
const { todos: ctrl } = require('../controllers')

const todosValidation = validation(joiSchema)
const isDoneValidation = validation(updateDoneSchema)

router.get('/',ctrl.getAllTodos)
router.post('/',todosValidation,  ctrl.addTodo)
router.get('/:todoId', ctrl.getTodoById)
router.delete('/:todoId',  ctrl.deleteTodo)
router.put('/:todoId',todosValidation,  ctrl.updateTodo)
router.patch('/:todoId',isDoneValidation,  ctrl.updateTodosIsDone)



module.exports = router