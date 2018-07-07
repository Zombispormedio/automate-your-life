const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

module.exports = class ServicesBuilder {
  static create () {
    return new ServicesBuilder()
  }

  constructor () {
    this.services = []
  }

  addService (service) {
    this.services.push(service)
  }

  async buildService ({
    packageName,
    serviceName,
    filename,
    cwd
  }) {
    const packageDefinition = await protoLoader.load(filename, {
      includeDirs: [
        cwd
      ]
    })
    const {
      [packageName]: {
        [serviceName]: Service
      }
    } = grpc.loadPackageDefinition(packageDefinition)
    return [serviceName, url => new Service(url, grpc.credentials.createInsecure())]
  }

  async build () {
    return (await Promise.all(this.services.map(this.buildService))).reduce((services, [serviceName, service]) => ({
      ...services,
      [serviceName]: service
    }), {})
  }
}
