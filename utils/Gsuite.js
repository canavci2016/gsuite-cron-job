const axios = require('axios').default;
let { google } = require('googleapis');
const https = require('https');

class Gsuite {
  keyObj;
  scopes;
  domainAdmin;


  constructor(keyObj, domainAdmin, scopes = ['https://www.googleapis.com/auth/admin.directory.user.readonly']) {
    this.keyObj = { clientEmail: keyObj.clientEmail, privateKey: keyObj.privateKey };
    this.scopes = scopes;
    this.domainAdmin = domainAdmin;
  }

  token() {
    const { clientEmail, privateKey } = this.keyObj, scopes = this.scopes, domainAdmin = this.domainAdmin;
    let client = new google.auth.JWT(clientEmail, null, privateKey, scopes, domainAdmin);
    return new Promise((res, rej) => client.authorize((err, tokens) => (err) ? rej(err) : res(tokens)));
  }

  async userList({ domain, maxResults, pageToken = null, token = null }) {
    const res = await axios.get('https://admin.googleapis.com/admin/directory/v1/users', {
      params: { domain, maxResults, pageToken },
      headers: { "Authorization": `Bearer ${token} ` },
      httpsAgent: new https.Agent({ rejectUnauthorized: false })
    });
    return res.data;
  }

  async userListIterate(query, callback) {
    let { domain, maxResults = 10, pageToken = null, authToken: token = null } = query;
    token = !token ? (await this.token()).access_token : token;
    const result = await this.userList({ domain, maxResults, pageToken, token });
    const callbackRes = await callback(result);

    if (callbackRes === false) return 1;

    const nextPageToken = result.nextPageToken;
    if (nextPageToken) return this.userListIterate({ ...query, authToken: token, pageToken: nextPageToken }, callback);

    return 1;
  }

}

module.exports = Gsuite;