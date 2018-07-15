const { sendToDownloadQueue } = require('../downloader')

module.exports = (call, callback) => {
  let buffer
  call.on('data', ({ chunks }) => {
    if (!buffer) {
      buffer = chunks
    } else {
      buffer = Buffer.concat([buffer, chunks])
    }
  })
  call.on('end', function () {
    sendToDownloadQueue(buffer, (error, accepted) => {
      if (error) return callback(error)
      callback(null, { accepted })
    })
  })
}
