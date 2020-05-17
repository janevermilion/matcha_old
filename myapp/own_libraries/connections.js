const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");

exports.connect = function () {
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
    let createConn = require("./config");
    let con = createConn.withoutDatabase();

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
    let createConn2 = require("./config");
    let pool = createConn2.withDatabase();
    pool.query("CREATE TABLE IF NOT EXISTS users(id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY ,user  VARCHAR(30) NOT NULL UNIQUE ,email VARCHAR(30) NOT NULL UNIQUE ,password VARCHAR(60),accepted_email BOOLEAN,notifications BOOLEAN,token VARCHAR(50) NOT NULL)ENGINE=INNODB", function(err, data) {
        if(err){
            errors++;
            return console.log(err);}
    });
    pool.end();
    let isBaseAndTablesCreated = errors === 0 ? true : false;
    return isBaseAndTablesCreated;
}