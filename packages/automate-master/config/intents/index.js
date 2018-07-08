const config = require('../')

const { intents } = config

const createWatcherCreator = key => {
  return ({ createWatcher }) => {
    const watcher = createWatcher(key)
    watcher.on('change', entries => {
      if (entries.length === 0) return
      const [ entry ] = entries
      config.set(`intents.${key}.url`, `${entry.Service.Address}:${entry.Service.Port}`)
      console.log(config.get('intents'))
    })
  }
}

exports.watcherCreators = Object.keys(intents).reduce((creators, key) => {
  const creator = createWatcherCreator(key)
  creators.push(creator)
  return creators
}, [])
