const { redisClient } = require('../lib/redis');
const set = require('lodash/set');
const get = require('lodash/get');

const ctxKey = (id) => `user-ctx-${id}`;

class UserCtx {
  constructor(userId) {
    this.userId = userId;
    this.ctx = {};
  }

  get key() {
    return ctxKey(this.userId);
  }

  async load() {
    const data = await redisClient.get(this.key);

    this.ctx = data ? JSON.parse(data) : {};

    return this;
  }
  
  get(path) {
    return get(this.ctx, path);
  }

  set(path, data) {
    set(this.ctx, path, data);

    return this;
  }

  async save() {
    await redisClient.set(this.key, JSON.stringify(this.ctx));

    return this;
  }
}

module.exports = UserCtx;
