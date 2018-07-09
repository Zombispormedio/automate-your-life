const fs = require('fs')

fs.mkdir('tmp', () => console.log('Created local /tmp'))
