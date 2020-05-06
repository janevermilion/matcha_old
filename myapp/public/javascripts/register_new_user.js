
module.exports = function regNewUser(body) {
    console.log(body);
    let getConnection = require('../javascripts/connect_to_database');
    let pool = getConnection();
    pool.query("INSERT INTO Users (user, email, password, accepted_email, token, notifications) VALUES (?,?,?,?,?,?)",[body['username']], function(err, data) {
        if(err){
            errors++;
            return console.log(err);}
    });

    let isBaseAndTablesCreated = errors === 0 ? true : false;
    return isBaseAndTablesCreated;
    return true;
};
