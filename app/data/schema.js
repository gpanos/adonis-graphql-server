'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

// Define our schema using the GraphQL schema language
const typeDefs = `
  type User {
    id: Int!
    username: String!
    email: String!
    tasks: [Task]
  }

  type Task {
    id: Int!
    title: String!
    description: String!
    user: User!
    todos: [Todo]
  }

  type Todo {
    id: Int!
    content: String!
    done: Boolean!
    task: Task!
  }

  type Query {
    allUsers: [User]
    fetchUser(id: Int!): User
    allTasks: [Task]
    fetchTask(id: Int!): Task
  }

  type Mutation {
    login (email: String!, password: String!): String
    createUser (username: String!, email: String!, password: String!): User
    addTask (title: String!, description: String!): Task
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
