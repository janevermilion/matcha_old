const cryptoRandomString = require('crypto-random-string');

exports.registerNewUser = function(body)
{
    console.log(body);
    const token = cryptoRandomString({length:35, type: 'url-safe'});
   let getConnection = require('../own_libraries/connections');
    let con = getConnection.connectWithBase();

    const sql = "INSERT INTO Users(user, email, password, accepted_email, notifications,token) VALUES(?, ?, ?, ?, ?, ?)";
    const data = [body['username'], body['email'],body['password'], false,true, token];
    con.query(sql,data, function(err, data) {
        if(err){
            throw new  Error(err);
        }
    });
    con.end();
    let sendEmail = require("../own_libraries/emails");
    sendEmail.sendEmail("token", {"address": body['email'], "token": token});
}

exports.acceptToken = function (token) {

    let getConnection = require('../own_libraries/connections');
    let con = getConnection.connectWithBase();
    const sql = "SELECT * FROM Users";
    let result = [];
    con.query(sql,token, function(err, data) {
        if(err)
            throw new  Error(err);
        result.push(data[0]);
        console.log("data is: " + data[0]);
        console.log("result inside callback:" + result);
    });
    console.log("result of sql:" + result);
    con.end();
}
exports.changePass = function () {

}
/*
Файл с либой для смены и подтверждения персональных данных. будут дополняться примерно таким образом
*/