// const service = require('./start')
// const { serviceName } = require('./config')

// service.start()
//   .then(() => console.log(`${serviceName} service connected at ${new Date()}`))
//   .catch(error => console.log(error))

// process.on('SIGINT', () => {
//   service.stop()
// })

const path = require('path')
const protoLoader = require('@grpc/proto-loader')
const grpc = require('grpc')

protoLoader.load('torrent.proto', {
  includeDirs: [
    path.resolve(__dirname, 'protobuf')
  ]
}).then(packageDefinition => {
  const pkg = grpc.loadPackageDefinition(packageDefinition)
  const client = new pkg.automate.Torrent('127.0.0.1:3000', grpc.credentials.createInsecure())
  client.ping({ message: 'sfSDF' }, (err, res) => {
    console.log(err, res)
  })
})
