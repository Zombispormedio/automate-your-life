const service = require('./start')
const { serviceName } = require('./config')

service.start(() => console.log(`${serviceName} service connected at ${new Date()}`))

process.on('SIGINT', () => {
  service.stop()
})
