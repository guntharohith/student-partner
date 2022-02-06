const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shettyrohith968@gmail.com',
        pass: 'igiujzaohxtjmwis'
    }
});

module.exports = transporter