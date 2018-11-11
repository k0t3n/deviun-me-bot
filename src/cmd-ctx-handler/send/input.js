const Lang = require('../../lib/lang');
const log = require('../../lib/log');
const get = require('lodash/get');

const lang = new Lang();

const LOG = '[src/cmd-ctx-handler/send/input]';
const MAX_MSG_COUNT = 20;

const allowUpdateType = ['message'];
const allowMsgType = ['text'];

module.exports = async (ctx) => {
  if (
    !allowUpdateType.includes(ctx.updateType) ||
    !ctx.updateSubTypes
      .find((t) => allowMsgType.includes(t))
  ) {
    log.info(`${LOG} unexpected content: `, {
      updateType: ctx.updateType,
      updateSubTypes: ctx.updateSubTypes
    });
    return ctx.reply(
      lang.get('unexpected-content')
    );
  }

  const msgText = get(ctx, 'update.message.text', '');

  if (!msgText) {
    return ctx.reply(
      lang.get('unexpected-content')
    );
  }

  const msgArray = ctx.userCtx.get('cmd-ctx.payload.messages') || [];

  if (msgArray.length > MAX_MSG_COUNT) {
    return ctx.reply(
      lang.get('send.too-many-msgs')
    );
  }

  msgArray.push(msgText);
  ctx.userCtx.set('cmd-ctx.payload.messages', msgArray);
  ctx.reply('next');
};
