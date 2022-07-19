const config = require('./config.json')
const Bot = require('./bot')
const path = require('path')
const fs = require('fs')

const bot = new Bot({
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port
})

bot.on('message', console.log)

loadPlugins(bot, 'plugins')

function loadPlugins (loader, directory) {
  const dirpath = path.join(__dirname, directory)

  for (const filename of fs.readdirSync(dirpath)) {
    if (!filename.endsWith('.js')) continue

    const filepath = path.join(dirpath, filename)

    const plugin = require(filepath)

    loader.loadPlugin(plugin)
  }
}
