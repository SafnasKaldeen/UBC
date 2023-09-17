const mysql = require("mysql");

require("dotenv").config();

//Create Connection
const db = mysql.createConnection(process.env.DATABASE_URL);
console.log("Connected to PlanetScale!");

module.exports = db;
