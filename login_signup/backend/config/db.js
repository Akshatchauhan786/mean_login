const mysql = require('mysql');

const mysqlconfig = {
    host: '192.168.1.123',
    user: 'root',
    password: 'Dnpl@2015',
    port: 3309,
    database: 'aman_practice',
    multipleStatement: true,
    datastrings: true
}

const con = mysql.createPool(mysqlconfig);

module.exports = con;