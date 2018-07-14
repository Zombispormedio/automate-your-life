require('dotenv').config()

module.exports = {
  apps: [
    {
      name: 'automate-torrent-download',
      script: './packages/automate-torrent-download/index.js',
      env: {
        watch: './packages/automate-torrent-download',
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
      name: 'automate-master',
      script: './packages/automate-master/index.js',
      env: {
        watch: './packages/automate-master',
        PORT: 3010
      },
      env_production: {
        watch: false,
        PORT: 3010
      }
    }
  ]
}
