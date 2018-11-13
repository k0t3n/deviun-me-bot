/**
 * Action flow for single process
 */

const AF = require('action-flow')({
  driverName: 'process',
  awaitTimeoutSec: 18000 // 5 hours
});

module.exports = AF;
