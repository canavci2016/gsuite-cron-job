const {mssql: {db1: {database, user, password, server}}} = require("../constants/database");
const {Sequelize, DataTypes, QueryTypes, Op} = require('sequelize');
const debug = require("../helpers/debug");

const sequelize = new Sequelize(database, user, password, {
  logging: msg => debug(msg.replace('Executing (default):', "")),
  host: server,
  dialect: 'mssql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  dialectOptions: {"options": {validateBulkLoadParameters: true}}
});

module.exports.SequelizeInstance = sequelize;
module.exports.Sequelize = Sequelize;
module.exports.DataTypes = DataTypes;
module.exports.QueryTypes = QueryTypes;
module.exports.Op = Op;