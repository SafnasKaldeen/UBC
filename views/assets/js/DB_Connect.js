const mysql = require("mysql");

// Create Connection
const db = mysql.createConnection({
  host: "ugaa-books-cloud.c9tzw0hrc9md.eu-north-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "UgaaBookCloudAdminToken",
  database: "ugaa_books_cloud",
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
