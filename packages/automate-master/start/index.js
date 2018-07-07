const serve = require('./serve')
const discover = require('./discover')

module.exports = {
  async start () {
    await discover.start()
    discover.health()
    discover.watch()
  },
  stop () {
    serve.stop()
    discover.stop()
  }
}
