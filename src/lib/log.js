const winston = require('winston');
const path = require('path');

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_PATH = path.resolve(__dirname, '../../', 'log');
const ERROR_PATH = path.resolve(LOG_PATH, 'error.log');
const COMBINED_PATH = path.resolve(LOG_PATH, 'combined.log');

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: ERROR_PATH, level: 'error' }),
    new winston.transports.File({ filename: COMBINED_PATH })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
