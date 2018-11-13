const Daemon = require('./daemon');
const mongo = require('../../lib/mongodb');
const log = require('../../lib/log');
const af = require('../../lib/action-flow');
const promise = require('bluebird');
const telegram = require('../../module/telegram');

const LOG = '[daemons/sender]';
const SUSCRIBERS_LIMIT = 30; // 10 people

const broadcast = mongo.collection('broadcast');
const suscribers = mongo.collection('suscribers');

class Sender extends Daemon {
  async task() {
    const flow = af.create({
      daemonTask: 'sender'
    });

    await flow.await();

    const task = await this.getTask();

    if (!task) {
      flow.end();
      return log.info(`${LOG} Task is not found. The End.`);
    }

    await this.sendToSuscribers(task);
    await this.deleteTask(task);
    flow.end();
  }

  async getTask() {
    return broadcast.findOne(null, {
      sort: {
        timestamp: 1
      }
    });
  }

  async deleteTask({ _id }) {
    await broadcast.deleteOne({
      _id
    });
  }

  async sendToSuscribers(task) {
    let suscribersChunk = [];
    let offset = 0;

    do {
      suscribersChunk = await suscribers.find(null, {
        sort: {
          timestamp: 1
        },
        limit: SUSCRIBERS_LIMIT,
        skip: offset
      });

      offset = suscribersChunk.length;

      await this.broadcastMessages(task, suscribersChunk);
    } while (suscribersChunk.length);
  }

  async broadcastMessages(task, to) {
    const { msg_array: messages } = task;

    for (const msg of messages) {
      const asyncArr = to.map(({ user_id: userId }) => (
        telegram.sendMessage(userId, msg)
      ));

      await promise.all(asyncArr);
      await promise.delay(1000);
    }
  }
}

module.exports = Sender;
