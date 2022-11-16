const mysql = require('mysql2/promise');

const connection = mysql.createPoll({
  host: "database",
  port: 3306,
  user: "root",
  password: "SenhaMuitoSegura!123",
  database: "KelDigitalBank"
});

module.exports = connection