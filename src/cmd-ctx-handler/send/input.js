const Lang = require('../../lib/lang');
const log = require('../../lib/log');
const get = require('lodash/get');
const Markup = require('telegraf/markup');
const mongo = require('../../lib/mongodb');

const lang = new Lang();
const broadcast = mongo.collection('broadcast');

const LOG = '[src/cmd-ctx-handler/send/input]';
const MAX_MSG_COUNT = 20;

const allowUpdateType = ['message'];
const allowMsgType = ['text'];

const processKeyBoard = () => (
  Markup
    .keyboard([
      [lang.get('send.send-button')],
      [lang.get('send.cancel-button')]
    ])
    .extra()
);
const removeKeyboard = () => (
  Markup.removeKeyboard(true).extra()
);
const breakProcess = async (type, ctx) => {
  const { id: userId } = ctx.from;
  let message;

  if (type === 'send') {
    await broadcast.insert({
      user_id: userId,
      timestamp: new Date().getTime(),
      msg_array: ctx.userCtx.get('cmd-ctx.payload.messages') || []
    });

    message = lang.get('send.pending');
  } else if (type === 'cancel') {
    message = lang.get('send.after-cancel');
  }

  ctx.userCtx.set('cmd-ctx', null);
  ctx.reply(
    message,
    removeKeyboard()
  );
};

const breakProcessInput = {
  [lang.get('send.send-button')]: 'send',
  [lang.get('send.cancel-button')]: 'cancel'
};

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
      lang.get('unexpected-content'),
      processKeyBoard()
    );
  }
  
  const msgText = get(ctx, 'update.message.text', '');
  const isBreak = breakProcessInput[msgText];
  
  if (isBreak) {
    return breakProcess(isBreak, ctx);
  }

  if (!msgText) {
    return ctx.reply(
      lang.get('unexpected-content'),
      processKeyBoard()
    );
  }

  const msgArray = ctx.userCtx.get('cmd-ctx.payload.messages') || [];

  if (msgArray.length > MAX_MSG_COUNT) {
    return ctx.reply(
      lang.get('send.too-many-msgs'),
      processKeyBoard()
    );
  }

  msgArray.push(msgText);
  ctx.userCtx.set('cmd-ctx.payload.messages', msgArray);
  ctx.reply(
    lang.get('send.process'),
    processKeyBoard()
  );
};
