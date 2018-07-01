module.exports = {
  apps: [
    {
      name: 'automate-torrent-download',
      script: './packages/automate-torrent-download/index.js',
      env: {
        PORT: 3040
      }
    }
  ]
}
