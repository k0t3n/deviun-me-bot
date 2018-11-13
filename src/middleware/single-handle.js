const af = require('../lib/action-flow');

module.exports = async (ctx, next) => {
  const { id } = ctx.from;
  const flow = af.create({
    description: 'user single operation',
    userId: id
  });

  await flow.await();
  await next();
  flow.end();
};
