const {env} = require('../helpers/helper');

module.exports = {
  environment: env('NODE_ENV'),
  companyId: env('COMPANY_ID'),
  port: env('PORT'),
  debug: env('DEBUG'),
  cron_pattern: env('CRON_PATTERN','5 */1 * * *'),
};
