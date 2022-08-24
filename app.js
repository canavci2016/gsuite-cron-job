const logger = require("./helpers/logger");
const kernel = require('./schedulers/kernel');
kernel();


process
    .on('unhandledRejection', (reason, p) => {
        logger.error(`unhandledRejection :`, { reason, p });
    })
    .on('uncaughtException', err => {
        logger.error(`uncaughtException :`, { err });
        process.exit(1);
    });

