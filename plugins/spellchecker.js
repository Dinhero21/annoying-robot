const words = require('../words.json')
const natural = require('natural')

function inject (bot) {
  const tokenizer = new natural.WordTokenizer()
  const spellcheck = new natural.Spellcheck(words)

  bot.on('message', (username, message, sender) => {
    const words = tokenizer.tokenize(message)

    for (const word of words) {
      if (spellcheck.isCorrect(word)) continue

      const corrections = spellcheck.getCorrections(word, 1)

      if (corrections.length === 0) {
        bot.chat('What the fuck did you say?')

        return
      }

      if (corrections.length > 5) {
        bot.chat('Bruh too many corrections boi')

        return
      }

      bot.chat(`Did you mean to say something like ${corrections.join(' or ')}?`)
    }
  })
}

module.exports = { inject }
