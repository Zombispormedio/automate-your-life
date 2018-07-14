const { Router } = require('express')
const { file } = require('../middlewares')
const { ping, attach } = require('../controllers/torrent.controller')

const router = Router()

router.get('/ping', ping)

router.post(
  '/attach',
  file.get(),
  file.validate({ mimetype: /application\/x-bittorrent/ }),
  attach
)

module.exports = router
