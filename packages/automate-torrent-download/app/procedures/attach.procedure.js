const fs = require('fs')

module.exports = (call, callback) => {
  fs.writeFile('result.torrent', call.request.chunks, (error) => {
    if (error) return callback(null, { accepted: false })
    callback(null, { accepted: true })
  })
}
