const {env} = require('../helpers/helper');

module.exports = {

  mssql: {

    db1: {
      server: env('MSSQL_DB1_HOST'),
      database: env('MSSQL_DB1_DATABASE'),
      user: env('MSSQL_DB1_USERNAME'),
      password: env('MSSQL_DB1_PASSWORD'),
      options: {
        "encrypt": true,
        "enableArithAbort": true
      }
    }

  },

  mongo: {

    db1: {
      connectionString: env('MONGO_DB1_CONNECTION_STRING'),
    },
    rateLimit: {
      connectionString: env('MONGO_RATE_LIMIT_CONNECTION_STRING', env('MONGO_DB1_CONNECTION_STRING')),
    }

  }

};