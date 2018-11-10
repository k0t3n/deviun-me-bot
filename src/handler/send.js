const Lang = require('../lib/lang');
const lang = new Lang();

module.exports = (ctx) => {
  if (!ctx.from.is_admin) {
    return;
  }

  if (ctx.userCtx.get('cmd-ctx')) {
    const message = lang.get('send.already-input');
    return ctx.reply(message);
  }

  const message = lang.get('send.before');

  ctx.userCtx.set('cmd-ctx', {
    name: 'send',
    step: 'input'
  });
  ctx.reply(message);
};
