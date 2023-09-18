const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "aws.connect.psdb.cloud",
  user: "u9dapca0be57tf9wsw78",
  password: "pscale_pw_5WEeNCwKxnFkl6srdiuwjtBqyGMlEhrPea1miD88qCj",
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
