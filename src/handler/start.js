const Lang = require('../lib/lang');
const lang = new Lang();

module.exports = (ctx) => {
  const isAdmin = ctx.from.is_admin;
  const isSuscribe = ctx.userCtx.get('suscribe');

  if (!isAdmin && isSuscribe) {
    return ctx.reply(
      lang.get('start.user-suscribe')
    );
  } else if (isAdmin && isSuscribe) {
    return ctx.reply(
      lang.get('start.admin-suscribe')
    );
  }
  
  ctx.reply(
    lang.get(`start.${isAdmin ? 'admin' : 'user'}`)
  );
};
