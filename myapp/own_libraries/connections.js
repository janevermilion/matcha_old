const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

exports.connectWithBase = function () {
    let createConn = require("./config");
    let con = createConn.withDatabase();
    con.connect(function (err, data) {
        if (err) {
            return console.log(err);
        }
    });
    return con;
}

exports.createDatabasesAndTables = function () {
    let createConn = require("../own_libraries/config");
    let con = createConn.withoutDatabase();

    let errors = 0;
    con.connect(function (err, data) {
        if (err) {
            errors++;
            throw new  Error(err);
        }
    });
    con.query("CREATE DATABASE IF NOT EXISTS matcha", function (err, data) {
        if (err) {
            errors++;
            throw new  Error(err);
        }
    });
    con.query("use matcha", function (err, data) {
        if (err) {
            errors++;
            throw new  Error(err);
        }
    });
    con.query("CREATE TABLE IF NOT EXISTS users(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY ,user  VARCHAR(30) NOT NULL UNIQUE ,email VARCHAR(30) NOT NULL UNIQUE ,password VARCHAR(60),accepted_email BOOLEAN,notifications BOOLEAN,token VARCHAR(50) NOT NULL)ENGINE=INNODB", function(err, data) {
        if(err){
            errors++;
            throw new  Error(err);}
    });
    con.end();
    let isBaseAndTablesCreated = errors === 0 ? true : false;
    return isBaseAndTablesCreated;
}