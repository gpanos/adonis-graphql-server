'use strict'

const Model = use('Model')

class Task extends Model {

  /**
   * A task belongs to a user.
   *
   * @method user
   *
   * @return {Object}
   */
  user () {
    return this.belongsTo('App/Models/User')
  }

  /**
   * A task can have many todos.
   *
   * @method todos
   *
   * @return {Object}
   */
  todos () {
    return this.hasMany('App/Models/Todo')
  }
}

module.exports = Task
