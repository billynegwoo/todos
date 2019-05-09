import { expect } from 'chai';
import 'mocha';
import * as request from 'supertest';
import { startServer } from '../startServer';

describe('Todos', () => {
    let id: string
    const value: string = 'yolo'
    const host: string = 'http://localhost:4000'
    let app: any

    before(async () => {
        app = await startServer();

    })

    after(async () => {
       await app.close()
    })

    it('should create a todo with no errors', async () => {
        const response = await request(host)
            .post('/graphql')
            .send({
                query: `mutation {
                            createTodo(value: "${value}") {
                                error {
                                    message
                                }
                                todo {
                                    value
                                    _id
                                    favorite
                                }
                            }
                        }`})

        expect(response.body.data.createTodo.error).to.be.null
        expect(response.body.data.createTodo.todo.value).equal(value)
        expect(response.body.data.createTodo.todo.favorite).to.be.null
        id = response.body.data.createTodo.todo._id
    });

    it('should not create a todo and return an error', async () => {
        const response = await request(host)
            .post('/graphql')
            .send({
                query: `mutation {
                             createTodo(value: "ke") {
                                 error {
                                     message
                                 }
                                 todo {
                                     value
                                     _id
                                     favorite
                                 }
                             }
                        }`})
        expect(response.body.data.createTodo.error).not.to.be.null
        expect(response.body.data.createTodo.todo).to.be.null
    });


    it('should list all todos', async () => {
        const response = await request(host)
            .post('/graphql')
            .send({
                query: `{
                            todos {
                                _id
                                value
                                favorite
                            }
                        }`})
        expect(response.body.data.todos).to.be.a('Array')
        expect(response.body.data.todos).to.have.length(1)
    });

    it('should get a todo', async () => {
        const response = await request(host)
            .post('/graphql')
            .send({
                query: `{
                    todo(_id: "${id}") {
                      favorite
                      value
                    }
                  }`})
        expect(response.body.data.todo.value).to.equal(value)
        expect(response.body.data.todo.favorite).to.be.null
    });


    it('should update a todo', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `
                    mutation {
                        updateTodo(_id: "${id}", value: "wesh") {
                            error {
                                message
                            }
                            todo {
                                value
                            }
                        }
                    }
                `})

        expect(response.body.data.updateTodo.todo.value).to.equal('wesh')
        expect(response.body.data.updateTodo.error).to.be.null
    })

    it('should not update a todo an return an error', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `
                   mutation {
                       updateTodo(_id: "${id}", value: "we") {
                           error {
                               message
                           }
                           todo {
                               value
                           }
                       }
                   }
               `})

        expect(response.body.data.updateTodo.todo).to.be.null
        expect(response.body.data.updateTodo.error).not.to.be.null
    })

    it('should not update a todo an return an error', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `
                   mutation {
                       updateTodo(_id: "5cd2d2a20424eb0a11c4e095", value: "yolo") {
                           error {
                               message
                           }
                           todo {
                               value
                           }
                       }
                   }
               `})

        expect(response.body.data.updateTodo.todo).to.be.null
        expect(response.body.data.updateTodo.error).not.to.be.null
    })

    it('should add a toto to favotites', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `
               mutation {
                addToFavorites(_id: "${id}") {
                  error {
                    message
                  }
                  todo {
                    favorite
                  }
                }
              }
               `})

        expect(response.body.data.addToFavorites.todo.favorite).to.be.true
        expect(response.body.data.addToFavorites.error).to.be.null
    })

    it('should return all favorites', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `{
                            favorites {value}
                        }`
            })

        expect(response.body.data.favorites).to.have.length(1)
    })

    it('should remove a toto from favotites', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `
                mutation {
                    removeFromFavorites(_id:"${id}"){
                       error {
                        message
                      }
                      todo {
                        favorite
                      }
                    }
                  }
               `})
        expect(response.body.data.removeFromFavorites.todo.favorite).to.be.false
        expect(response.body.data.removeFromFavorites.error).to.be.null
        const secondResponse = await request(host)
            .post('/graphql').send({
                query: `{
                            favorites {value}
                        }`
            })

        expect(secondResponse.body.data.favorites).to.have.length(0)
    })


    it('should remove a toto', async () => {
        const response = await request(host)
            .post('/graphql').send({
                query: `
                mutation {
                    deleteTodo(_id: "${id}") 
                }
               `})
        expect(response.body.data.deleteTodo).to.be.true
        const secondResponse = await request(host)
            .post('/graphql').send({
                query: `{
                            todos {value}
                        }`
            })

        expect(secondResponse.body.data.todos).to.be.a('Array')
        expect(secondResponse.body.data.todos).to.have.length(0)
    })


});