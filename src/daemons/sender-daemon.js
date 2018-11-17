const senderDaemon = require('./source/sender');
const scheduledTime = '*/5 * * * * *'; // every 5th sec

const daemon = new senderDaemon({ scheduledTime });

daemon.start();
