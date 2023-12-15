"use strict";
const mysql = require('mysql2');
const { databaseConfig } = require('./config');
const pool = mysql.createPool({
    host: databaseConfig.host,
    user: databaseConfig.user,
    password: databaseConfig.password,
    database: databaseConfig.database,
    connectionLimit: 10,
});
const promisePool = pool.promise();
module.exports = promisePool;
