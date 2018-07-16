const NodeEmitter = require('events')
const fs = require('fs')
const WebTorrent = require('webtorrent')
const parser = require('./parser')

const client = new WebTorrent()

const applyDownloadEvents = emitter => {
  emitter.on('progress', () => {

  })

  emitter.on('downloaded', () => {

  })

  emitter.on('download', buffer => {
    client.add(buffer, function (torrent) {
      torrent.files.forEach(file => {
        file.createReadStream().pipe(fs.createWriteStream(file.path))
      })
    })
  })

  emitter.on('receive', buffer => {
    const relevantInfo = parser.parse(buffer).extractRelevantInfo()
    console.log(relevantInfo)
    fs.mkdir(relevantInfo.name, () => {
      emitter.emit('download', buffer)
    })
    emitter.emit('accepted')
  })
}

module.exports = {
  sendToDownloadQueue (buffer, callback) {
    const emitter = new NodeEmitter()
    emitter.once('accepted', () => callback(null, true))
    emitter.once('unaccepted', () => callback(null, false))
    emitter.once('error', () => callback)
    applyDownloadEvents(emitter)
    emitter.emit('receive', buffer)
  }
}
