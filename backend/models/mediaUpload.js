const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
require('dotenv').config();

const mediaSchema = new Schema({
    name:{
        type:String,
    },
    file:{
        type:String,
    },
    email:{
        type:String,
    }
})


mediaSchema.post("save", async function(doc) {
    try{
        console.log("DOC",doc)

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from:`jai`,
            to: doc.email,
            subject: "New File Uploaded on Cloudinary",
            html:`<h2>TESTING</h2> </p>`,
        })
        
        console.log("INFO", info);


    }
    catch(error) {
        console.error(error);
    }
})




const mediaModel = mongoose.model("media", mediaSchema);
module.exports = mediaModel;
