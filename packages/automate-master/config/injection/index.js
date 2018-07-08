const { createContainer, asFunction } = require('awilix')
const { intents } = require('../')
const { load, services } = require('./services')

const container = createContainer()

container.register({
  torrentService: asFunction(() => {
    console.log(services.Torrent)
    return services.Torrent(intents.torrent.url)
  }).scoped()
})

exports.createScope = () => container.createScope()
exports.constainer = container
exports.load = load
