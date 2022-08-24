const logger = require("../helpers/logger");
const {cron_pattern} = require("../constants/common");
const {currentDate} = require("../helpers/helper");
var CronJob = require('cron').CronJob;
const fetchUsersFromGsuiteAndInsertJob = require('./jobs/FetchUsersFromGsuiteAndInsert');


console.log("kernel is started: ", currentDate());

var job = new CronJob(cron_pattern, function () {
  logger.info(`cron tick  at : ${currentDate()} `);

  fetchUsersFromGsuiteAndInsertJob();

}, null, true);

module.exports = () => job.start();

