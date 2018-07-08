const consul = require('consul')
const waitOn = require('wait-on')
const uuid = require('uuid/v4')

module.exports = class ServiceDiscovery {
  static create (configuration) {
    return new ServiceDiscovery(configuration)
  }

  constructor (configuration) {
    this.configuration = configuration
    this.watchers = []
    this.setupClient()
  }

  setupClient () {
    if (!this.configuration) return
    this.client = consul({
      ...this.configuration,
      promisify: true
    })
  }
  setConfiguration (configuration) {
    this.setupClient(configuration)
    return this
  }

  waitConsul () {
    const { configuration: { host, port } } = this
    return new Promise((resolve, reject) => {
      waitOn({
        resources: [
          `http://${host}:${port}`
        ],
        delay: 1000,
        interval: 100
      }, err => {
        if (err) { return reject(err) }
        resolve()
      })
    })
  }

  registerWatcherCreators (watcherCreators) {
    this.watcherCreators = watcherCreators
    return this
  }

  registerService ({ serviceName, port, address = '127.0.0.1', serviceId }) {
    this.serviceName = serviceName
    this.serviceId = serviceId || uuid()
    this.address = address
    this.port = port
    return this
  }

  async start () {
    const { serviceName, serviceId, port, address } = this
    console.log('Waiting Service Discovery....')
    await this.waitConsul()
    return this.client.agent.service.register({
      name: serviceName,
      id: serviceId,
      address,
      port,
      check: {
        ttl: '10s',
        deregister_critical_service_after: '1m'
      }
    })
  }

  health () {
    this.healthId = setInterval(() => {
      this.client.agent.check.pass({id: `service:${this.serviceId}`}, err => {
        if (err) throw new Error(err)
      })
    }, 5 * 1000)
  }

  createWatcher (service) {
    const watcher = this.client.watch({
      method: this.client.health.service,
      options: {
        service,
        passing: true
      }
    })
    this.watchers.push(watcher)
    return watcher
  }

  watch () {
    const createWatcher = this.createWatcher.bind(this)
    this.watcherCreators.forEach(creator => creator({ createWatcher }))
  }

  unregisterHealth () {
    if (this.healthId) {
      clearInterval(this.healthId)
    }
  }

  finishWatchers () {
    this.watchers.forEach(watcher => watcher.end())
    this.watchers = []
  }

  stop () {
    const { serviceName, serviceId } = this
    this.unregisterHealth()
    this.finishWatchers()
    return this.client.agent.service.deregister({
      name: serviceName,
      id: serviceId
    })
  }

  async stopAll () {
    const { serviceName } = this
    const result = await this.client.agent.service.list({name: serviceName})
    return Promise.all(Object.keys(result).map(id => this.client.agent.service.deregister({
      name: serviceName,
      id
    })))
  }
}
