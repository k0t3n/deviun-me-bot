const config = require('config');
const Lang = require('../lib/lang');

const lang = new Lang();

const ADMIN = config.get('bot.adminId');

module.exports = (ctx) => {
  const isAdmin = !ctx.from.is_bot && ADMIN === ctx.from.id;
  const message = lang.get(`start.${isAdmin ? 'admin' : 'user'}`);
  
  ctx.reply(message);
};
