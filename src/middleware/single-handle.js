const af = require('../lib/action-flow');
const get = require('lodash/get');
const getSender = require('../util/get-sender');

module.exports = async (ctx, next) => {
  const { id } = getSender(ctx);
  const flow = af.create({
    description: 'user single operation',
    userId: id
  });

  await flow.await();
  await next();
  flow.end();
};
