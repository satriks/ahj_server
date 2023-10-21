const { Date } = require('core-js')
const { v4: uuidv4 } = require('uuid')

class Ticket {
  constructor (name) {
    this.id = uuidv4()
    this.name = name, //eslint-disable-line
    this.name = name,
    this.status = false,
    this.created = Date.now()
  }
}

module.exports = {
  Ticket
}
