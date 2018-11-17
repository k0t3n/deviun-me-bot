const config = require('config');
const Telegram = require('telegraf/telegram');

const ACCESS_TOKEN = config.get('bot.accessToken');

const telegram = new Telegram(ACCESS_TOKEN);

module.exports = telegram;
