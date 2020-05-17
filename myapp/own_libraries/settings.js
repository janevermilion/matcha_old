const cryptoRandomString = require('crypto-random-string');

exports.registerNewUser = function(body)
{
    //console.log(body);
    let getConnection = require('../own_libraries/connections');
    let con = getConnection.connect();
    const token = cryptoRandomString({length:35, type: 'url-safe'});
    const sql = "INSERT INTO Users(user, email, password, accepted_email, notifications,token) VALUES(?, ?, ?, ?, ?, ?)";
    const data = [body['username'], body['email'],body['password'], false,true, token];
    con.query(sql,data, function(err, data) {
        if(err){
            console.log(err);
            return false;
        }
    });
    con.end();
    let sendEmail = require("../own_libraries/emails");
    let res= sendEmail.sendEmail("token",{"address": body['email'], "token": token});
    return res;
}

exports.acceptToken = function (token) {

}

exports.changePass = function () {

}
//Файл с либой для смены и подтверждения персональных данных. будут дополняться примерно таким образом