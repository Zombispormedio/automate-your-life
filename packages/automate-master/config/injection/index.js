const { createContainer, asFunction } = require('awilix')
const config = require('../')
const { load, services } = require('./services')

const container = createContainer()

container.register({
  torrentService: asFunction(() => services.Torrent(config.intents.torrent.url)).scoped()
})

exports.createScope = () => container.createScope()
exports.constainer = container
exports.load = load
