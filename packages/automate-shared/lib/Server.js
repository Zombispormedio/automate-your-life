const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')
const {
  mergeDeepRight
} = require('ramda')

module.exports = class Server {
  static create () {
    return new Server()
  }
  constructor () {
    this.server = new grpc.Server()
    this.procedures = {}
  }
  addProcedures (procedures) {
    this.procedures = mergeDeepRight(this.procedures, procedures)
    return this
  }

  setServiceConfiguration (serviceConfiguration) {
    this.serviceConfiguration = serviceConfiguration
    return this
  }

  setProtobuffer (proto) {
    this.proto = proto
    return this
  }

  setPort (port) {
    this.port = port
    return this
  }

  async loadService () {
    const { packageName, serviceName } = this.serviceConfiguration
    const packageDefinition = await protoLoader.load(this.proto.filename, {
      includeDirs: [
        this.proto.cwd
      ]
    })
    const {
      [packageName]: {
        [serviceName]: {
          service: serviceDefinition
        }
      }
    } = grpc.loadPackageDefinition(packageDefinition)

    this.server.addService(serviceDefinition, this.procedures)
  }

  async start () {
    await this.loadService()
    this.server.bind(`0.0.0.0:${this.port}`, grpc.ServerCredentials.createInsecure())
    this.server.start()
  }

  stop () {
    this.server.forceShutdown()
  }
}
