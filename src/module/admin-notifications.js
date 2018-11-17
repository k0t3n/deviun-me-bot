const config = require('config');
const telegram = require('./telegram');

const TARGET = config.get('notificationChannel.id');

class AdminNotifications {
  static send(message) {
    return telegram.sendMessage(TARGET, message);
  }
}

module.exports = AdminNotifications;
