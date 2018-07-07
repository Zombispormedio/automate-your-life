const {
  ServicesBuilder
} = require('automate-shared')
const {
  protoPath,
  protobuffers,
  packageName
} = require('../')

let services = {}

const builder = Object.values(protobuffers).reduce((builder, {
  filename,
  serviceName
}) => {
  builder.addService({
    cwd: protoPath,
    filename,
    serviceName,
    packageName
  })
  return builder
}, ServicesBuilder.create())

const load = async () => {
  services = await builder.build()
  console.log(services)
}

module.exports = new Proxy(services, {
  get (target, property) {
    if (property === 'load') return load
    return services[property]
  }
})
