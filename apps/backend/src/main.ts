import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { RestaurantResolver } from './app/restaurant/restaurant.resolver';
import { DBHandler } from './app/db/db';
import { exitHandler } from './exit-handler';
import { DishResolver } from './app/dish/dish.resolver';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  DBHandler.read();
  exitHandler();

  const schema = await buildSchema({
    resolvers: [RestaurantResolver, DishResolver]
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  const { url } = await server.listen(PORT);
  console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();
