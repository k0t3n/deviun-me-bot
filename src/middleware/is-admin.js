const config = require('config');
const getSender = require('../util/get-sender');
const set = require('lodash/set');

const ADMIN = config.get('bot.adminId');

module.exports = (ctx, next) => {
  const { id, is_bot } = getSender(ctx);

  set(ctx, 'from.is_admin', id === ADMIN && !is_bot);
  next();
};
