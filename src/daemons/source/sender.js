const Daemon = require('./daemon');
const mongo = require('../../lib/mongodb');
const log = require('../../lib/log');

class Sender extends Daemon {
  task() {
    console.log('test');
  }
}

module.exports = Sender;
