const grpc = require('grpc')
const proto = require('../config/proto')
const {
  packageName,
  serviceName,
  port
} = require('../config')
const procedures = require('./procedures')

module.exports = () => new (class Application {
  constructor () {
    this.server = new grpc.Server()
  }

  async loadService () {
    const packageDefinition = await proto.load()
    const {
      [packageName]: {
        [serviceName]: {
          service: serviceDefinition
        }
      }
    } = grpc.loadPackageDefinition(packageDefinition)

    this.server.addService(serviceDefinition, procedures)
  }

  async start () {
    await this.loadService()
    this.server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure())
    this.server.start()
  }

  stop () {
    this.server.forceShutdown()
  }
})()
