const { ServiceDiscovery } = require('automate-shared')
const { serviceName, consul, port } = require('../config')

module.exports = ServiceDiscovery.create()
  .setConfiguration(consul)
  .registerService({ serviceName, port })
