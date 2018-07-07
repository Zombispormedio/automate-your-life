const path = require('path')
const convict = require('convict')

const config = convict({
  port: {
    doc: 'Server port',
    default: 3000,
    env: 'PORT'
  },
  protoPath: {
    doc: 'Directory path where there are proto files',
    default: path.resolve(__dirname, '../protobuf'),
    env: 'PROTO_PATH'
  },
  protoFilename: {
    doc: 'Main proto file name',
    default: 'torrent.proto',
    env: 'PROTO_FILENAME'
  },
  packageName: {
    doc: 'Protobuffer package name',
    default: 'automate',
    env: 'PACKAGE_NAME'
  },
  serviceName: {
    doc: 'Protobuffer main service',
    default: 'Torrent',
    env: 'SERVICE_NAME'
  },
  consul: {
    host: {
      doc: 'Consul host',
      default: '127.0.0.1',
      env: 'CONSUL_HOST'
    },
    port: {
      doc: 'Consul port',
      default: 8500,
      env: 'CONSUL_PORT'
    }
  },
  intents: {
    master: {
      url: 'http://example.com'
    }
  }
})

module.exports = new Proxy(config, {
  get (target, property) {
    return target[property] || target.get(property)
  }
})
