import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import AWS from 'aws-sdk';
import graphQLSchema from './graphql/schema/index';
import graphQLResolvers from './graphql/resolvers/index';

AWS.config.update({
  region: "us-east-2",
});

const app = express();
app.use(bodyParser.json());

app.use('/api', graphqlHTTP({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true,
}));

app.listen(3000);
