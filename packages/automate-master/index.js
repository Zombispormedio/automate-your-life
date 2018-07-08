const serializeError = require('serialize-error')
const service = require('./start')
const { serviceName } = require('./config')

service.start()
  .then(() => console.log(`${serviceName} service connected at ${new Date()}`))
  .catch(error => console.log(serializeError(error)))

process.on('SIGINT', () => {
  service.stop()
})
