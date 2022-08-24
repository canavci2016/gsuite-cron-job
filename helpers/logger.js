const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');


const formatCombination = format.combine(
  format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
  format.errors({stack: true}),
  format.splat(),
  format.json()
);

var dailyRotateFile = new transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d'
});


const logger = createLogger({
  level: 'silly',
  format: formatCombination,
  defaultMeta: {service: 'your-service-name'},
  transports: [
    dailyRotateFile,
  //  new transports.File({filename: 'logs/combined.log'}),
  ]
});


const debugLogger = createLogger({
  level: 'silly',
  format: formatCombination,
  defaultMeta: {service: 'user-service'},
  transports: [
    new transports.File({filename: 'logs/debug.log'}),
    new transports.Console(),
  ],
});


module.exports = logger;
module.exports.debugLogger = debugLogger;