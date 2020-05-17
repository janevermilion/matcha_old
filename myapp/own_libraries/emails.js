



const nodemailer = require("nodemailer");



let sendTokenEmail = function (address, token) {
    const mailOptions = {
        from: "jslavehthunder@gmail.com", // sender address
        to: address, // list of receivers
        subject: "Hello from matcha✔", // Subject line
        text: "Hello!This is matcha!", // plain text body
        html: "<b>Hello!This is matcha!</b><p>To accept your e-mail, please get the <a href='http://localhost:3000/settings?act=accept&token=" + token + " '>link</a> below: </p>"
    };
    return mailOptions;
}

exports.sendEmail = function (type,data) {
    let mailOptions;
    const transport = nodemailer.createTransport({
       /* logger: {
            debug: console.log,
            info: console.info,
            warn: console.warn,
            error: console.error
        },*/
        host: "smtp.gmail.com",///
        port: 465,//465
        secure: true, // true for 465, false for other ports
        auth: {
            user: "jslavehthunder@gmail.com", // generated ethereal user
            pass: "jslavehthunder125" // generated ethereal password
        }
    });
    switch (type){
        case "token":
        {
            mailOptions = sendTokenEmail(data.address, data.token);
            break;
        }
    }
    let isSended;
    var isResolved = false;

let createPromise = function() {
    return new Promise(function (resolve, reject) {
        if (transport.sendMail(mailOptions))
            resolve("Message sending succesfully");
        else
            reject(new Error("Error with sending message"));

    });
}
    async function wait() {
    try {
        let res = await createPromise().then(function() {
            isResolved = true;
        });
    }
    catch (e) {
        console.log(e);
    }
    }
    wait();
    return isSended;

}
