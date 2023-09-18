const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "aws.connect.psdb.cloud",
  user: "enpau402qtun4bsfdupw",
  password: "pscale_pw_x995CGTdUC5Mskv7KSxQwH5rXNw7gMXyZl1V7wX9ECC",
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
