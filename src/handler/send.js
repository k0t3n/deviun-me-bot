const Lang = require('../lib/lang');
const lang = new Lang();

module.exports = (ctx) => {
  if (!ctx.from.is_admin) {
    return;
  }

  if (ctx.userCtx.get('cmd-ctx')) {
    return ctx.reply(
      lang.get('send.already-input')
    );
  }

  ctx.userCtx.set('cmd-ctx', {
    name: 'send',
    step: 'input'
  });
  ctx.reply(
    lang.get('send.before')
  );
};
