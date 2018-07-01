const { serviceName } = require('./config')
const server = require('./start')()

server.start().then(() => console.log(`${serviceName} service connected`))

process.on('SIGINT', () => {
  server.stop()
})
