const config = require('config');

const ADMIN = config.get('bot.adminId');

module.exports = (ctx, next) => {
  ctx.from.is_admin = ctx.from.id === ADMIN && !ctx.from.is_bot;
  next();
};
