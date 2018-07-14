const Busboy = require('busboy')
const Joi = require('joi')

const get = () => (req, res, next) => {
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
}

const validate = ({ mimetype }) => (req, res, next) => {
  const { error } = Joi.validate(
    req.payload,
    Joi.object({
      mimetype: Joi.string().regex(mimetype),
      length: Joi.number().max(500000)
    }),
    {
      allowUnknown: true
    }
  )
  if (error) return res.status(400).json(error)
  next()
}

module.exports = {
  get,
  validate
}
