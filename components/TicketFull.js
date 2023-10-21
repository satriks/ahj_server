const { Ticket } = require('./Ticket')

class TicketFull extends Ticket {
  constructor (name, description) {
    super(name)
    this.description = description
  }
}

module.exports = {
  TicketFull
}
