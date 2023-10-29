const Koa = require('koa')
const { koaBody } = require('koa-body')
const { TicketFull } = require('./components/TicketFull')
const { Date } = require('core-js')
const cors = require('@koa/cors')

const port = 7070
const app = new Koa()

console.log(new Date(Date.now()).toLocaleString())
app.use(koaBody())
app.use(cors())

const desc2 = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident laboriosam natus maxime? Autem fuga impedit, placeat dolores vitae qui eos eveniet tempore dolorem dolorum id delectus odit, laboriosam et odio!'

let tickets = [new TicketFull('test', 'Описание тестового тикета'), new TicketFull('task2', desc2)]

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  await next();
});
// GET
app.use(async (ctx, next) => {
  const { method, id } = ctx.request.query
  if (ctx.request.method !== 'GET') {
    next()
    return
  }
  const ticket = tickets.find((ticket) => ticket.id === id) && tickets.find((ticket) => ticket.id === id).description
  switch (method) {
    case 'allTickets':
      ctx.response.body = [...tickets].map(el => {
        return { id: el.id, name: el.name, status: el.status, created: el.created }
      })
      return

    case 'ticketById':
      if (ticket) ctx.response.body = JSON.stringify({ description: ticket })
      else ctx.response.status = 409
  }
})
// POST
app.use(async (ctx, next) => {
  const { method } = ctx.request.query
  if (ctx.request.method === 'POST') {
    if (ctx.request.body && method === 'createTicket') {
      const { name, description } = JSON.parse(ctx.request.body)
      const ticket = new TicketFull(name, description)
      tickets = [...tickets, ticket]
      ctx.response.status = 201
      console.log('Был создан тикет с id', ticket.id, new Date(Date.now()).toLocaleString())
      return
    }
    ctx.response.status = 409
    ctx.response.body = `Method ${method} not found`
    return
  }

  next()
})
// PATCH
app.use(async (ctx, next) => {
  const { method } = ctx.request.query

  if (ctx.request.method === 'PATCH') {
    if (method === 'changeStatus') {
      const { id, status } = JSON.parse(ctx.request.body)
      const ticket = tickets.find((ticket) => ticket.id === id)
      if (ticket) {
        ticket.status = status
        ctx.response.status = 201
        console.log('Был изменен статус у тикета с id', ticket.id, new Date(Date.now()).toLocaleString())
        return
      }
    }
    if (method === 'updateTicket') {
      const { id, name, description, status } = JSON.parse(ctx.request.body)
      const ticket = tickets.find((ticket) => ticket.id === id)
      if (ticket) {
        ticket.name = name
        ticket.description = description
        ticket.status = status
        ctx.response.status = 201
        console.log('Был обновлен тикет с id', ticket.id, new Date(Date.now()).toLocaleString())
        return
      }
      ctx.response.status = 409
    }
    return
  }

  next()
})
// DELETE
app.use(async (ctx, next) => {
  const { method, id } = ctx.request.query

  if (ctx.request.method === 'DELETE') {
    if (method === 'deleteTicket') {
      tickets = tickets.filter((ticket) => ticket.id !== id)
      ctx.response.status = 204
      console.log('Был удален тикет с id: ', id, new Date(Date.now()).toLocaleString())
      return
    }
    ctx.response.status = 409
    return
  }

  next()
})
// another
app.use(async (ctx) => {
  ctx.response.body = 'not allow'
})

app.listen(port)
console.log('listen port ' + port)

// ---------------------------
// операции создания — создание ресурса через метод POST;

// операции чтения — возврат представления ресурса через метод GET;

// операции редактирования — перезапись ресурса через метод PUT или редактирование через PATCH;

// операции удаления — удаление ресурса через метод DELETE.
