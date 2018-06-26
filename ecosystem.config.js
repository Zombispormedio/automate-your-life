module.exports = {
  apps: [
    {
      name: 'app',
      script: './packages/automate-torrent-download/index.js',
      env: {
        PORT: 3000
      }
    }
  ]
}
