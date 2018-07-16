const path = require('path')
const convict = require('convict')

const config = convict({
  port: {
    doc: 'Server port',
    default: 3010,
    env: 'PORT'
  },
  protoPath: {
    doc: 'Directory path where there are proto files',
    default: path.resolve(__dirname, '../protobuf'),
    env: 'PROTO_PATH'
  },
  protobuffers: {
    torrent: {
      filename: {
        doc: 'Main torrent proto file name',
        default: 'torrent.proto',
        env: 'TORRENT_PROTO_FILENAME'
      },
      serviceName: {
        doc: 'Protobuffer service',
        default: 'Torrent',
        env: 'TORRENT_SERVICE_NAME'
      }
    }
  },
  packageName: {
    doc: 'Protobuffer package name',
    default: 'automate',
    env: 'PACKAGE_NAME'
  },
  serviceName: {
    doc: 'service name',
    default: 'Master',
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
    torrent: {
      url: ''
    },
    storage: {
      url: ''
    },
    activity: {
      url: ''
    }
  }
})

module.exports = new Proxy(config, {
  get (target, property) {
    return target[property] || target.get(property)
  }
})
