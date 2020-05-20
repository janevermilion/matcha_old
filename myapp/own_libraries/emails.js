const nodemailer = require("nodemailer");

let sendTokenEmail = function (address, token) {
    return {
        from: "jslavehthunder@gmail.com", // sender address
        to: address, // list of receivers
        subject: "Hello from matcha✔", // Subject line
        text: "Hello!This is matcha!", // plain text body
        html: "<b style='color: green;'>Hello!This is matcha!</b><p>To accept your e-mail, please get the <a href='http://localhost:3000/settings?act=accept&token=" + token + " '>link</a> below: </p>"
    };
}
exports.sendEmail = function (type, data) {
    let emailOptions;
    switch (type) {
        case "token": {
            emailOptions = sendTokenEmail(data.address, data.token);
            break;
        }
    }

        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com", ///"smtp.gmail.com"
            port: 465, //465
            secure: true, // true for 465, false for other ports
            auth: {
                user: "jslavehthunder@gmail.com", // generated ethereal user
                pass: "jslavehthunder125" // generated ethereal password
            }
        }, function (error) {
            throw new Error(error);
        })
         transport.sendMail(emailOptions, function (error) {
           throw new Error(error);
        })
}