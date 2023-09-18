require("dotenv").config();
const mysql = require("mysql");

// Create Connection
// const db = mysql.createConnection({
//   host: "aws.connect.psdb.cloud",
//   user: "8bgb8l0pdd5gt49ia5zt",
//   password: "pscale_pw_7yFXeMSk3cE55unbld8YCP3ZFmMda4VEJxOs8feJKFD",
//   database: "ugaa-book-cloud",
//   ssl: {
//     rejectUnauthorized: true,
//   },
// });

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
