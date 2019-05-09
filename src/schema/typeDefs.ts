import { gql } from 'apollo-server-express'

export const typeDefs = gql`

type Error {
    message: String!
}

type Response {
    error: Error
    todo: Todo
}

type Todo {
    _id: String
    value: String
    favorite: Boolean
}

type Query {
    todo(_id:String!): Todo
    todos: [Todo]!
    favorites: [Todo]!
}

type Mutation {
    createTodo(value:String!): Response!
    updateTodo(_id:String!, value:String!): Response!
    deleteTodo(_id:String!): Boolean!
    addToFavorites(_id:String!): Response!
    removeFromFavorites(_id:String!): Response!
}
`