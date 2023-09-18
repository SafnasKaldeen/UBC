const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "aws.connect.psdb.cloud",
  user: "q4psex3e2zvtl51l0j8g",
  password: "pscale_pw_lInKwyU1U5pYZbdqRy58fn0jP8L41xYLDBaPEtjXgvK",
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
