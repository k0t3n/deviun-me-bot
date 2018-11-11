const Lang = require('../lib/lang');
const log = require('../lib/log');

const lang = new Lang();

const LOG = '[src/handler/cmd-ctx]';

module.exports = async (ctx) => {
  const { name, step } = ctx.userCtx.get('cmd-ctx') || {};

  if (!name) {
    return ctx.reply(
      lang.get('dont-understand')
    );
  }

  let ctxCmdHandler;

  try {
    ctxCmdHandler = require(`../cmd-ctx-handler/${name}/${step}`);
  } catch (err) {
    log.error([LOG, err, { name, step }]);
    return ctx.reply(
      lang.get('server-error')
    );
  }

  await ctxCmdHandler(ctx)
    .catch((err) => {
      log.error([LOG, err]);
      ctx.reply(
        lang.get('server-error')
      );
    });
};
