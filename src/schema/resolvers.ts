import { Todo } from "../entity/Todo";
import { IResolvers } from "graphql-tools";
import { todoValidationSchema } from "../validators/todoValidationSchema"



export const resolvers: IResolvers = {
    Query: {
        todo: (_, { _id }) => Todo.findOne(_id),

        todos: () => Todo.find(),

        favorites: () => Todo.find({ where: { favorite: true } })
    },

    Mutation: {
        createTodo: async (_, { value }) => {
            let response
            const validation = todoValidationSchema.validate({ value })
            if (validation.error) {
                response = {
                    error: {
                        message: 'Value must be a string with a minimum of 3 characters.'
                    }
                }
            } else {
                const todo = await Todo.create({ value }).save()
                response = {
                    todo
                }
            }
            return response
        },

        updateTodo: async (_, { _id, value }) => {
            let response
            const validation = todoValidationSchema.validate({ value })
            if (validation.error) {
                response = {
                    error: {
                        message: 'Value must be a string with a minimum of 3 characters.'
                    }
                }
            } else {
                const todo = await Todo.findOne(_id)
                if (!todo) {
                    response = {
                        error: {
                            message: 'Todo not found'
                        }
                    }
                } else {
                    todo.value = value
                    todo.save()
                    response = { todo }
                }
            }
            return response
        },

        deleteTodo: async (_, { _id }) => {
            await Todo.delete(_id)
            return true
        },

        addToFavorites: async (_, { _id }) => {
            let response
            const todo = await Todo.findOne(_id)
            if (!todo) {
                response = {
                    error: {
                        message: 'Todo not found'
                    }
                }
            } else {
                todo.favorite = true
                todo.save()
                response = { todo }
            }
            return response
        },

        removeFromFavorites: async (_, { _id }) => {
            let response
            const todo = await Todo.findOne(_id)
            if (!todo) {
                response = {
                    error: {
                        message: 'Todo not found'
                    }
                }
            } else {
                todo.favorite = false
                todo.save()
                response = { todo }
            }
            return response
        },

    }
}

