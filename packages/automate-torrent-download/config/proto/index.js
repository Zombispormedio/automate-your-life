const protoLoader = require('@grpc/proto-loader')
const { protoPath, protoFilename } = require('../')

module.exports = {
  load () {
    return protoLoader.load(protoFilename, {
      includeDirs: [
        protoPath
      ]
    })
  }
}
