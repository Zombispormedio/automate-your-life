const { Router } = require('express')

const router = Router()

router.get('/ping', (req, res, next) => {
  const torrentService = req.scope.resolve('torrentService')
  torrentService.ping({ }, (error, response) => {
    if (error) return next(error)
    res.json(response)
  })
})

module.exports = router
