const fs = require('fs')

module.exports = (call, callback) => {
  let writer
  call.on('data', function ({ chunks, meta: { filename } }) {
    if (!writer) {
      writer = fs.createWriteStream(`tmp/${filename}`)
    }
    writer.write(chunks)
  })
  call.on('end', function () {
    writer.end()
    callback(null, { accepted: true })
  })
}
