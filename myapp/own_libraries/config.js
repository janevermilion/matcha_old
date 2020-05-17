const mysql = require("mysql2");

exports.withoutDatabase = function () {
    let conn= mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "12345"
    });
    return conn;
}
exports.withDatabase = function () {
    let conn= mysql.createConnection({
        host: "localhost",
        user: "admin",
        database: "matcha",
        password: "12345"
    });

    return conn;
}