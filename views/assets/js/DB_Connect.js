require("dotenv").config();
const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection(process.env.DATABASE_URL);

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
  } else {
    console.log("Connected to PlanetScale!");
  }
});

module.exports = db;
