const nodemailer = require("nodemailer");
const mediaModel = require('../models/mediaUpload');

mediaModel.post("save", async function (doc) {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: 'jai singh',
            to: doc.email,
            subject: "TESTING",
            text: "FROM JAI",
            html: "<b>MESSI GOAT</b>",
        });

        console.log("Message sent: %s", info.messageId);

    } catch (e) {
        console.log(e);
    }
});
