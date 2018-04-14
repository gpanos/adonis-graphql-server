'use strict'

const Model = use('Model')

class Todo extends Model {

  /**
   * A todo belongs to a task.
   *
   * @method task
   *
   * @return {Object}
   */
  task () {
    return this.belongsTo('App/Models/Task')
  }
}

module.exports = Todo
