const mysql = require("mysql2");


module.exports = function createDatabaseAndTables(){

    var con = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "12345",
        multipleStatements: true // this allow you to run multiple queries at once.
    });

    let errors = 0;
    con.connect(function (err, data) {
        if (err) {
            errors++;
            return console.log(err);
        }
    });
    con.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, data) {
        if (err) {
            errors++;
            return console.log(err);
        }
    });
    let creatPoolFunc = require("../javascripts/config");
    let pool = creatPoolFunc();
    pool.query("CREATE TABLE IF NOT EXISTS users(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY ,user  VARCHAR(30) NOT NULL UNIQUE ,email VARCHAR(30) NOT NULL UNIQUE ,password VARCHAR(60),accepted_email BOOLEAN,notifications BOOLEAN,token VARCHAR(50) NOT NULL)ENGINE=INNODB", function(err, data) {
        if(err){
            errors++;
            return console.log(err);}
    });

    let isBaseAndTablesCreated = errors === 0 ? true : false;
    return isBaseAndTablesCreated;
};