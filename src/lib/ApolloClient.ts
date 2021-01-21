import { ApolloCache, ApolloClient, ApolloLink } from '@apollo/client';
import { withClientState } from 'apollo-link-state';
import { APOLLO_SERVER } from '../config';
import { resolvers, defaults } from './resolvers'
import { InMemoryCache } from 'apollo-cache-inmemory';

const typeDefs = `
  type Todo {
    id: Int!
    text: String!
    completed: Boolean!
  }
  type Mutation {
    addTodo(text: String!): Todo
    toggleTodo(id: Int!): Todo
  }
  type Query {
    visibilityFilter: String
    todos: [Todo]
  }
`;
const cache = new InMemoryCache({}) as any;
const stateLink = withClientState({ resolvers, defaults, cache, typeDefs })

export const client = new ApolloClient({
  uri: APOLLO_SERVER,
  cache: cache,
  link: ApolloLink.from([
    stateLink as any,
  ]),
});
console.log("APOLLO_SERVER", process.env)