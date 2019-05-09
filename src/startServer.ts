import { createConnection, getConnectionOptions } from "typeorm";
import { ApolloServer } from 'apollo-server-express'
import { typeDefs } from './schema/typeDefs'
import { resolvers } from './schema/resolvers'
import * as express from 'express'

export const startServer = async () => {

    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    createConnection({ ...connectionOptions, name: "default" });
    

    const server = new ApolloServer({
        typeDefs,
        resolvers,
    });

    const app = express()
    server.applyMiddleware({ app });
    return app.listen({ port:4000 }, () =>
        console.log(`🚀 Server ready to take off at http://localhost:4000${server.graphqlPath}`)
    )
}