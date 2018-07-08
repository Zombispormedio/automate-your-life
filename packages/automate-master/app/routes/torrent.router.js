const { Router } = require('express')

const router = Router()

router.get('/ping', (req, res, next) => {
  const torrentService = req.scope.resolve('torrentService')
  console.log(torrentService.ping)
  torrentService.ping({ message: 'hello' }, (error, response) => {
    console.log(error)
    if (error) return next(error)
    res.json(response)
  })
})

module.exports = router
