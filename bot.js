const { EventEmitter } = require('events')
const assert = require('assert')
const { createClient } = require('minecraft-protocol')

class Bot extends EventEmitter {
  _client
  options = {}

  constructor (options) {
    super()

    this._assertOptions(options)

    this.option = options

    const client = createClient({
      username: options.username,
      password: options.password,
      host: options.host,
      port: options.port
    })

    this._client = client

    client.on('connect', () => {
      this.emit('connect')
    })

    client.on('end', reason => {
      this.emit('end', reason)
    })

    client.on('error', error => {
      this.emit('error', error)
    })
  }

  _assertOptions (options) {
    assert.ok(options, 'Options are required')
    assert.strictEqual(typeof options, 'object', 'Options must an object')

    assert.ok(options.host, 'Options must have a host property')
    assert.strictEqual(typeof options.host, 'string', 'Options.host must be a string')

    assert.ok(options.port, 'Options must have a port property')
    assert.strictEqual(typeof options.port, 'number', 'Options.port must be a number')

    assert.ok(options.username, 'Options must have a username property')
    assert.strictEqual(typeof options.username, 'string', 'Options.username must be a string')
  }

  loadPlugin (plugin) {
    plugin.inject(this)
  }

  write (name, data) {
    return this._client.write(name, data)
  }

  chat (message) {
    return this.write('chat', { message })
  }
}

module.exports = Bot
