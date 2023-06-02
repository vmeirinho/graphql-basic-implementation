const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

// Construct a schema using GraphQL schema language
const schema = buildSchema(`
  type User {
    id: ID
    name: String
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!, email: String!): User
  }
`);

// Define the root resolver
const root = {
  users: () => users,
  user: ({ id }) => users.find(user => user.id === parseInt(id)),
  addUser: ({ name, email }) => {
    const id = users.length + 1;
    const newUser = { id, name, email };
    users.push(newUser);
    return newUser;
  },
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // Enable GraphiQL for testing
  })
);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
