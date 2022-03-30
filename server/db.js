const mysql = require("mysql2/promise");

const db = mysql.createPool({
    user: "root",
    password: "",
    host: "localhost",
    port: 3306,
    database:"todoapp",
});


module.exports = db;