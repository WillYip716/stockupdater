require("dotenv").config();
const nodemailer = require('nodemailer');
const defaultMailingList = process.env.MAILINGLIST;
const senderEmail = process.env.SENDER;
const senderPassword = process.env.SPASS; // gmail app password
module.exports = {
    sendMail: async (subject, text, to = defaultMailingList) => {
        try {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            auth: {
            user: senderEmail,
            pass: senderPassword,
            },
        });

        const message = {
            from: `report sender <${senderEmail}>`,
            to,
            subject,
            text: subject,
            html: text,
        };

        transporter.sendMail(message, () => {});
        } catch (e) {
        // handle errors here
        }
    },
};