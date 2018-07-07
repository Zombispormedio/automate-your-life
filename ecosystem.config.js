module.exports = {
  apps: [
    {
      name: 'automate-torrent-download',
      script: './packages/automate-torrent-download/index.js',
      env: {
        watch: './packages/automate-torrent-download',
        PORT: 3040
      },
      env_production: {
        watch: false,
        PORT: 3040
      }
    }
  ]
}
