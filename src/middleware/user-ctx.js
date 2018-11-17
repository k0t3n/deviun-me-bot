const UserCtx = require('../module/user-context');
const getSender = require('../util/get-sender');

module.exports = async (ctx, next) => {
  const { id } = getSender(ctx);
  ctx.userCtx = await new UserCtx(id).load();
  await next();
  ctx.userCtx.save();
};
