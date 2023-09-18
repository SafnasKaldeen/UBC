const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "aws.connect.psdb.cloud",
  user: "vl4n0ymzbiecs6u5sgot",
  password: "pscale_pw_PNgsAefk12KJIrzEhRvMyep6aJdVJC2nlIv9lORq1SZ",
  database: "ugaa-book-cloud",
  ssl: {
    rejectUnauthorized: true,
  },
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to PlanetScale!");
  }
});

module.exports = db;
