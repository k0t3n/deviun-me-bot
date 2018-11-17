const Lang = require('../lib/lang');
const mongo = require('../lib/mongodb');
const actions = require('../module/actions');
const promise = require('bluebird');
const notify = require('../module/admin-notifications');
const getSender = require('../util/get-sender');

const lang = new Lang();
const suscribersModel = mongo.collection('suscribers');

module.exports = async (ctx) => {
  const {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    username
  } = getSender(ctx);
  const fullName = [firstName, lastName].join(' ');
  const isSuscribe = ctx.userCtx.get('suscribe');

  if (!isSuscribe) {
    return ctx.reply(
      lang.get('unsuscribe.not-suscribe')
    );
  }

  const suscribersCount = await suscribersModel.count() - 1;

  await promise.all([
    suscribersModel.deleteOne({
      user_id: userId
    }),
    actions.create({
      action: 'unsuscribe',
      userId,
      fullName,
      username
    }),
    notify.send(
      lang.get('notification.unsuscribe', {
        fullName,
        username,
        suscribersCount,
      })
    )
  ]);

  ctx.userCtx.set('suscribe', false);
  ctx.reply(
    lang.get('unsuscribe.done')
  );
};
