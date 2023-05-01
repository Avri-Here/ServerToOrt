const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('', ((req, res) => {
    const { nameRef, LastRef, email, Phone, message } = req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'avriwork05484@gmail.com',
            pass: 'twqwpjgdatcfatnv'
        }
    });

    var mailOptions = {
        from: 'avriwork05484@gmail.com',
        to: 'avriwork05484@gmail.com',
        subject: 'Sending Email using Node.js',
        text: `From : ${nameRef} ${LastRef} , email: ${email}, Phone: ${Phone}, message: ${message}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(407).json({ error })
        } else {
            res.status(200).json({ EmailSent: info.response });
        }
    });

}))
module.exports = router;