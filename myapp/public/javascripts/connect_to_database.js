const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");


module.exports = function () {

    var pool = require("../javascripts/config");
    pool.query("use matcha", function (err, data) {
        if(err) return console.log(err);
        res.redirect("/");
    })
    return pool;
};
