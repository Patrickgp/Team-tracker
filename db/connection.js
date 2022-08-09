const mysql = require("mysql2");

// Connect to mysql database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username
    user: "root",
    // MySQL password
    password: "1956sell",
    database: "company_db",
  },
  console.log("Connected to the company database.")
);

module.exports = db;
