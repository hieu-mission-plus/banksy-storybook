import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

export const defaults = {
  todos: [],
  visibilityFilter: 'SHOW_ALL',
};

let nextTodoId = 0;

export const resolvers = {
  Mutation: {
    addTodo: (_: any, { text }: {text: string}, { cache }: {cache: InMemoryCache}) => {
      const query = gql`
        query GetTodos {
          todos @client {
            id
            text
            completed
          }
        }
      `;
      const previous = cache.readQuery({ query }) as any;
      const newTodo = {
        id: nextTodoId++,
        text,
        completed: false,
        __typename: 'TodoItem',
      };
      const data = {
        todos: previous.todos.concat([newTodo]),
      };
      cache.writeData({ data });
      return newTodo;
    },
    toggleTodo: (_: any, variables: any, { cache }: {cache: InMemoryCache}) => {
      const id = `TodoItem:${variables.id}`;
      const fragment = gql`
        fragment completeTodo on TodoItem {
          completed
        }
      `;
      const todo = cache.readFragment({ fragment, id }) as any;
      const data = { ...todo, completed: !todo.completed };
      cache.writeData({ id, data });
      return null;
    },
  },
};
