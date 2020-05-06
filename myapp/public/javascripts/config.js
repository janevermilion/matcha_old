const mysql = require("mysql2");

module.exports = function createConnection() {
    let pool= mysql.createPool({
        connectionLimit: 5,
        host: "localhost",
        user: "admin",
        database: "matcha",
        password: "12345"
    });
    pool.query("use matcha", function (err, data) {
        if (err) {
            return console.log(err);
        }
    });
    return pool;
};
