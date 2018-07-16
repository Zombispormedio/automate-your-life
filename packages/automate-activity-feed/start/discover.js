const { ServiceDiscovery } = require('automate-shared')
const { serviceName, consul, port } = require('../config')
const { watcherCreators } = require('../config/intents')

module.exports = ServiceDiscovery.create(consul)
  .registerService({ serviceName, port })
  .registerWatcherCreators(watcherCreators)
