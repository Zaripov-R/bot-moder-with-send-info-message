require('dotenv').config()
const { Telegraf } = require('telegraf')
const stopWords = require('./const')
const mysql = require("mysql2")

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply(`Здравствуйте, ${ctx.message.chat.first_name}`)
})

bot.on('message', async ctx => {
    if (ctx.message.text !== 'undefined') {
        const message = ctx.message.text.toLowerCase()
        const message_id = ctx.message.message_id

        for (let item of stopWords) {
            if (message.includes(item)) {
                ctx.telegram.sendMessage(process.env.ADMIN_ID, `${ctx.message.from.id}: ${ctx.message.text}`)
                ctx.deleteMessage(message_id)
                ctx.reply('Message deleted - forbidden words')
            }
        }
    }
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))