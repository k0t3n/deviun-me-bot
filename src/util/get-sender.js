const get = require('lodash/get');
const pick = require('lodash/pick');

module.exports = (ctx) => {
  const source = get(
    ctx, 'from',
    get(
      ctx,
      'update.channel_post.chat',
      {}
    )
  );

  return pick(source, [
    'id',
    'is_bot',
    'first_name',
    'last_name',
    'username'
  ]);
};
