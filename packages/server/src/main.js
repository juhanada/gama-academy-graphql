import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './graphl/typeDefs';
import resolvers from './graphl/resolvers';

const app = express();

const server = new ApolloServer({
    typeDefs, // shorthand js typeDefs: typeDefs, sendo o último a constante
    resolvers,
    introspection: true,
    playground: true,
});


async function serverStart() {
    try {
        await server.start()
        server.applyMiddleware({
            app,
            cors: {
                origin: '*'
            },
            bodyParserConfig: true,
        })
    } catch (error){
        console.log(error)
    }
}

serverStart();
    
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

// configurando variáveis de ambiente no windows $env:PORT=0000

app.listen(PORT, HOSTNAME, () => {
    //console.log(process.env.PORT);
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`); 
});