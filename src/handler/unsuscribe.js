const Lang = require('../lib/lang');
const mongo = require('../lib/mongodb');
const actions = require('../module/actions');
const promise = require('bluebird');

const lang = new Lang();
const suscribersModel = mongo.collection('suscribers');

module.exports = async (ctx) => {
  const {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    username
  } = ctx.from;
  const isSuscribe = ctx.userCtx.get('suscribe');

  if (!isSuscribe) {
    return ctx.reply(
      lang.get('unsuscribe.not-suscribe')
    );
  }

  await promise.all([
    suscribersModel.deleteOne({
      user_id: userId
    }),
    actions.create({
      action: 'unsuscribe',
      userId,
      fullName: [firstName, lastName].join(' '),
      username
    })
  ]);

  ctx.userCtx.set('suscribe', false);
  ctx.reply(
    lang.get('unsuscribe.done')
  );
};
