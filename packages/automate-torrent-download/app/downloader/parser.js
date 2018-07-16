const parseTorrent = require('parse-torrent')
const { pick } = require('ramda')

const extractRelevantInfo = pick(['files', 'name', 'length'])

module.exports = {
  parse (buffer) {
    return new Proxy(parseTorrent(buffer), {
      get (target, property) {
        if (property === 'extractRelevantInfo') return () => extractRelevantInfo(target)
        return target[property]
      }
    })
  }
}
