const Lang = require('../lib/lang');
const lang = new Lang();

module.exports = (ctx) => {
  const isAdmin = ctx.from.is_admin;
  const isSuscribe = ctx.userCtx.get('suscribe');

  if (!isAdmin && isSuscribe) {
    const message = lang.get('start.user-suscribe');
    return ctx.reply(message);
  } else if (isAdmin && isSuscribe) {
    const message = lang.get('start.admin-suscribe');
    return ctx.reply(message);
  }

  const message = lang.get(`start.${isAdmin ? 'admin' : 'user'}`);
  
  ctx.reply(message);
};
