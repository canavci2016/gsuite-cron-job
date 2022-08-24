const {env} = require('../helpers/helper');


const list = env('APPS', []).map(obj => ({
  domain: obj.DOMAIN_NAME,
  domainAdminEmail: obj.DOMAIN_ADMIN_EMAIL,
  company: {id: obj.COMPANY_ID, name: obj.COMPANY_NAME},
  serviceAccount: {clientEmail: obj.SERVICE_ACCOUNT_CLIENT_EMAIL, privateKey: obj.SERVICE_ACCOUNT_PRIVATE_KEY},
}));


module.exports = list;