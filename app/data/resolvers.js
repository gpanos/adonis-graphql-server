'use strict'


const User = use('App/Models/User')
const Task = use('App/Models/Task')
const Todo = use('App/Models/Todo')

const resolvers = {
  Query: {
    // Fetch all users
    async allUsers() {
      const users = await User.all()
      return users.toJSON()
    },
    // Get a user by its ID
    async fetchUser(_, { id }) {
      const user = await User.find(id)
      return user.toJSON()
    },
    // Fetch all tasks
    async allTasks() {
      const tasks = await Task.all()
      return tasks.toJSON()
    },
    // Get a task by its ID
    async fetchTask(_, { id }) {
      const task = await Task.find(id)
      return task.toJSON()
    }
  },

  Mutation: {
    // Handles user login
    async login(_, { email, password }, { auth }) {
      const { token } = await auth.attempt(email, password)
      return token
    },

    // Create new user
    async createUser(_, { username, email, password }) {
      return await User.create({ username, email, password })
    },

    // Add a new task
    async addTask(_, { title, description }, { auth }) {
      try {
        // Check if user is logged in
        await auth.check()

        // Get the authenticated user
        const user = await auth.getUser()

        // Add new task
        return await Task.create({
          user_id: user.id,
          title,
          description
        })
      } catch (error) {
        // Throw error if user is not authenticated
        throw new Error('Missing or invalid jwt token')
      }
    }
  },

  User: {
    // Fetch all tasks created by a user
    async tasks(userInJson) {
      // Convert JSON to model instance
      const user = new User()
      user.newUp(userInJson)

      const tasks = await user.tasks().fetch()
      return tasks.toJSON()
    }
  },
  Task: {
    // Fetch the creator of a particular task
    async user(taskInJson) {
      // Convert JSON to model instance
      const task = new Task()
      task.newUp(taskInJson)

      const user = await task.user().fetch()
      return user.toJSON()
    }
  }
}

module.exports = resolvers
