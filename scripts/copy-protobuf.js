const path = require('path')
const fs = require('fs-extra')

const packagesDir = path.resolve(__dirname, '../packages')
const protobufDir = path.resolve(__dirname, '../protobuf')

const getProtobuffers = async () => (await fs.readdir(protobufDir)).map(protobuf => ({
  [path.basename(protobuf, '.proto')]: pkg => path.resolve(packagesDir, pkg, 'protobuf', protobuf)
}))

const getPackages = () => fs.readdir(packagesDir)

const getProtoDeps = async pkg => {
  try {
    const filepath = path.resolve(packagesDir, pkg, '.protorrc')
    const raw = (await fs.readFile(filepath)).toString()
    return JSON.parse(raw)
  } catch (_) {
    return []
  }
}

const copyProtobuffers = protobuffers => async pkg => {
  const protoDeps = await getProtoDeps(pkg)
  const promises = protoDeps.map(async proto => {
    const protoDst = path.resolve(packagesDir, pkg, 'protobuf', `${proto}.proto`)
    await fs.ensureFile(protoDst)
    const protoSrc = path.resolve(protobufDir, `${proto}.proto`)
    return fs.copyFile(protoSrc, protoDst)
  })
  if (promises.length === 0) return
  return Promise.all(promises)
}

const main = async () => {
  const protobuffers = await getProtobuffers()
  const copyProtoDeps = copyProtobuffers(protobuffers)
  return Promise.all(
    (await getPackages()).map(copyProtoDeps)
  )
}

main()
