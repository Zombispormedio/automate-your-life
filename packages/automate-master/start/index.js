const serve = require('./serve')
const discover = require('./discover')
const services = require('../config/services')

module.exports = {
  async start () {
    await services.load()
  },
  stop () {

  }
}
