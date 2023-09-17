const mysql = require("mysql");

//Create Connection
const db = mysql.createConnection(
  `mysql://vl4n0ymzbiecs6u5sgot:pscale_pw_PNgsAefk12KJIrzEhRvMyep6aJdVJC2nlIv9lORq1SZ@aws.connect.psdb.cloud/ugaa-book-cloud?ssl={"rejectUnauthorized":true}"`
);
console.log("Connected to PlanetScale!");

module.exports = db;
