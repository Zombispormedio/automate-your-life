const { Server } = require('automate-shared')
const { packageName, serviceName, port, protoFilename, protoPath } = require('../config')
const procedures = require('./procedures')

module.exports = Server.create()
  .setProtobuffer({ filename: protoFilename, cwd: protoPath })
  .setServiceConfiguration({ packageName, serviceName })
  .setPort(port)
  .addProcedures(procedures)
