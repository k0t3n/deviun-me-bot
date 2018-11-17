const senderDaemon = require('./source/sender');
const scheduledTime = '0 */1 * * * *'; // every 1 min

const daemon = new senderDaemon({ scheduledTime });

daemon.start();
