const consul = require('consul')
const uuid = require('uuid/v4')

module.exports = class ServiceDiscovery {
  static create () {
    return new ServiceDiscovery()
  }

  setConfiguration (configuration) {
    this.configuration = configuration
    return this
  }

  registerService ({ serviceName, port, serviceId }) {
    this.serviceName = serviceName
    this.serviceId = serviceId || uuid()
    this.port = port
    return this
  }
  async start () {
    const { configuration, serviceName, serviceId, port } = this
    this.client = consul({
      ...configuration,
      promisify: true
    })
    return this.client.agent.service.register({
      name: serviceName,
      id: serviceId,
      port
    })
  }

  async stop () {
    const { serviceName, serviceId } = this
    return this.client.agent.service.deregister({
      name: serviceName,
      id: serviceId
    })
  }
}
