const UserCtx = require('../module/user-context');

module.exports = async (ctx, next) => {
  ctx.userCtx = await new UserCtx(ctx.from.id).load();
  await next();
  ctx.userCtx.save();
};
