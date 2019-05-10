You will have to create a simple todo list with CRUD actions + favorites

Tech:
* Typescript
* node/express
* graphql with apollo server
* mongo 
* joi
* docker
* tests


## Dependencies 

* [Docker](https://www.docker.com/) 
* [Mocha](https://mochajs.org/)
* [Nodejs](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [Typescript](https://www.typescriptlang.org/)
* [Mongodb](https://www.mongodb.com/)
* [Apollo server](https://www.apollographql.com/docs/apollo-server/)
* [Joi](https://github.com/hapijs/joi)
* [Express](https://expressjs.com/)
* [Typeorm](https://typeorm.io)


## Start the project 

Run ``$ docker-compose up`` to get the project up and running

Go to [playground](http://localhost:4000/graphql)

## Testing

If you dont have the mongo docker image, pull it by running:
```
$ docker pull mongo
```

Start the mongo docker:
```
$ docker run -p 27017:27017 -d mongo
```
Install Dependencies:
```
$ npm install
``` 
Launch the tests by running:
```
$ npm run test 
```

