const { Router } = require('express')
const Busboy = require('busboy')
const Joi = require('joi')
const { ping, attach } = require('../controllers/torrent.controller')

const router = Router()

router.get('/ping', ping)

router.post('/attach',
  (req, res, next) => {
    const busboy = new Busboy({ headers: req.headers })
    busboy.on('file', (fieldname, fileStream, filename, encoding, mimetype) => {
      req.payload = {
        length: req.headers['content-length'],
        fieldname,
        fileStream,
        filename,
        encoding,
        mimetype
      }
      next()
    })
    req.pipe(busboy)
  },
  (req, res, next) => {
    const { error } = Joi.validate(
      req.payload,
      Joi.object({
        mimetype: Joi.string().regex(/application\/x-bittorrent/),
        length: Joi.number().max(500000)
      }),
      {
        allowUnknown: true
      }
    )
    if (error) return res.status(400).json(error)
    next()
  },
  attach)

module.exports = router
