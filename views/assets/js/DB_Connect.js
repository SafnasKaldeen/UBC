const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "aws.connect.psdb.cloud",
  user: "2ro6b6xfkn7gd2ue8h7n",
  password: "pscale_pw_t3Flj58IeA7Bp8bgRdvfGYoWggMMD9nK8gBrpmc0n1L",
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
