const JustMongo = require('just-mongo');
const config = require('config');
const models = require('../mongo-models');
const log = require('./log');

const LOG = '[lib/mongodb]';

const mongo = new JustMongo({
  models,
  db: config.get('mongodb.db'),
  host: config.get('mongodb.hostname'),
  user: config.get('mongodb.user'),
  password: config.get('mongodb.password'),
  port: config.get('mongodb.port'),
}, (err) => {
  if (err) {
    return log.error(`${LOG}`, err);
  }

  log.info(`${LOG} Mongodb is connected`);
});

module.exports = mongo;
