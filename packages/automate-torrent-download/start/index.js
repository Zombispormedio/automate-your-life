const serve = require('./serve')
const discover = require('./discover')

module.exports = {
  start (cb) {
    (async () => {
      try {
        await serve.start()
        await discover.start()
        cb()
      } catch (error) {
        console.log(error)
        cb(error)
      }
    })()
  },
  stop () {
    serve.stop()
    discover.stop()
  }
}
