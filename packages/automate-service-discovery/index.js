const execa = require('execa')

const command = 'consul'

const args = [ 'agent', '-ui' ]

if (process.env.NODE_ENV !== 'production') {
  args.push('-dev')
}

let childProcess

try {
  childProcess = execa(command, args)
  childProcess.stdout.pipe(process.stdout)
} catch (error) {
  console.log(error)
}

process.on('SIGINT', () => {
  if (childProcess) {
    childProcess.kill('SIGINT')
  }
})
