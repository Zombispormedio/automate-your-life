exports.ping = (req, res, next) => {
  const torrentService = req.scope.resolve('torrentService')
  torrentService.ping({}, (error, response) => {
    if (error) return next(error)
    res.json(response)
  })
}

exports.attach = (req, res, next) => {
  const {
    fileStream
  } = req.payload
  const torrentService = req.scope.resolve('torrentService')
  fileStream.on('data', (chunks) => {
    torrentService.attach({ chunks }, (err, result) => {
      if (err) return next(err)
      res.json(result)
    })
  })
}
