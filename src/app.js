const config = require('config');
const log = require('./lib/log');
const Telegraf = require('telegraf');

const ACCESS_TOKEN = config.get('bot.accessToken');
const LOG = '[app]';

const bot = new Telegraf(ACCESS_TOKEN);

// init handlers
for (const handler of config.get('bot.handler', [])) {
  const args = handler.args || [];
  const method = handler.method;
  const handlerCtrl = require(`./handler/${handler.handler}`);

  bot[method](...args, handlerCtrl);
}

bot.startPolling();
log.info(`${LOG} Bot has been started`);
