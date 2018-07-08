const express = require('express')
const bodyParser = require('body-parser')
const serializeError = require('serialize-error')
const morgan = require('morgan')
const { port } = require('../config')
const injection = require('../config/injection')
const { StatusRouter, TorrentRouter } = require('../app/routes')

const app = express()
let server
const startServer = () => new Promise((resolve) => {
  app.listen(port, function () {
    resolve(this)
  })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use(StatusRouter)

app.use((req, res, next) => {
  req.scope = injection.createScope()
  next()
})

app.use('/torrent', TorrentRouter)

app.use((err, req, res, next) => {
  res.status(500).json(serializeError(err))
})

module.exports = {
  async start () {
    await injection.load()
    server = await startServer()
  },
  stop () {
    server.close()
  }
}
