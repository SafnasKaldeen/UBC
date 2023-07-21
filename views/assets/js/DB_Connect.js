const mysql = require('mysql')

//Create Connection
const db = mysql.createConnection({
    host        :   'localhost',
    user        :   'root',  
    password    :   'CyberFlash2000@',
    database    :   'ugaa_book_cloud'});

module.exports = db;
