const { createClient } = require('then-redis');
const config = require('config');

const openRedis = () => {
  return createClient({
    host: config.get('redis.hostname'),
    port: config.get('redis.port')
  });
};

const redisClient = openRedis();

module.exports = {
  redisClient,
  openRedis
};
