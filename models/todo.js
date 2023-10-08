const { Schema, model } = require('mongoose')
const Joi = require('joi')


const todoSchema =new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
        },
        description: {
            type: String,
        },
        isDone: {
            type: Boolean,
            default: false,
        },
    },
    { versionKey: false, timestamps: true },
)

const joiSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string(),
    isDone: Joi.boolean(),
})
const updateDoneSchema = Joi.object({
    isDone: Joi.boolean().required(),
})

const Todo = model('todo', todoSchema)

module.exports = {
    Todo,
    joiSchema,
    updateDoneSchema,
}
