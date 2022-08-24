const Gsuite = require('../utils/Gsuite');

module.exports = async (config, callback) => {
  const gsuiteIns = new Gsuite(config.serviceAccount, config.domainAdminEmail);
  return  gsuiteIns.userListIterate({domain: config.domain, maxResults: 500}, callback);
};