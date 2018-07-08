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

module.exports = {
  load,
  services: new Proxy(services, {
    get (target, property) {
      return services[property]
    }
  })
}
