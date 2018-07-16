require('dotenv').config()

const randomPort = () => {
  return Math.random() * (5000 - 3000) + 3000
}

const torrentPort = randomPort()
const activityPort = randomPort()
const storagePort = randomPort()

module.exports = {
  apps: [
    {
      name: 'automate-master',
      script: './packages/automate-master/index.js',
      env: {
        watch: './packages/automate-master',
        PORT: 3000
      },
      env_production: {
        watch: false,
        PORT: 3000
      }
    },
    {
      name: 'automate-service-discovery',
      script: './packages/automate-service-discovery/index.js',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'automate-torrent-download',
      script: './packages/automate-torrent-download/index.js',
      env: {
        watch: './packages/automate-torrent-download',
        PORT: torrentPort
      },
      env_production: {
        watch: false,
        PORT: torrentPort
      }
    },
    {
      name: 'automate-storage-search',
      script: './packages/automate-storage-search/index.js',
      env: {
        watch: './packages/automate-storage-search',
        PORT: storagePort
      },
      env_production: {
        watch: false,
        PORT: storagePort
      }
    },
    {
      name: 'automate-activity-feed',
      script: './packages/automate-activity-feed/index.js',
      env: {
        watch: './packages/automate-activity-feed',
        PORT: activityPort
      },
      env_production: {
        watch: false,
        PORT: activityPort
      }
    }
  ]
}
