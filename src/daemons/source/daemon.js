const cron = require('node-cron');

class Daemon {
  constructor({ scheduledTime }) {
    this.scheduledTime = scheduledTime;

    this.worker = cron.schedule(
      this.scheduledTime, this.task,
      {
        scheduled: false
      }
    );
  }

  task() {
    throw new Error('not implemented in your daemon');
  }

  start() {
    return this.worker.start();
  }

  stop() {
    return this.worker.stop();
  }
}

module.exports = Daemon;
