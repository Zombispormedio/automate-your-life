const service = require('./start')
const { serviceName } = require('./config')

service.start()
  .then(() => console.log(`${serviceName} service connected at ${new Date()}`))
  .catch(error => console.log(error))

process.on('SIGINT', () => {
  service.stop()
})
