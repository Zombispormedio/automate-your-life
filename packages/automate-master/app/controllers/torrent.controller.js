exports.ping = (req, res, next) => {
  const torrentService = req.scope.resolve('torrentService')
  torrentService.ping({}, (error, response) => {
    if (error) return next(error)
    res.json(response)
  })
}

exports.attach = (req, res, next) => {
  const {
    fileStream, filename, mimetype
  } = req.payload
  const torrentService = req.scope.resolve('torrentService')
  const call = torrentService.attach((error, response) => {
    if (error) return next(error)
    res.json(response)
  })

  fileStream.on('data', (chunks) => {
    call.write({
      meta: { filename, mimetype },
      chunks
    })
  })

  fileStream.on('end', () => {
    call.end()
  })
}
