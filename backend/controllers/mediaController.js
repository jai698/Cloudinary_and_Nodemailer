const mediaModel = require('../models/mediaUpload');
const cloudinary = require('cloudinary').v2

exports.localFileUpload = async function (req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const file = req.files.file;
        console.log(name);
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        // console.log(path)
        console.log(file)
        file.mv(path, (e) => {
            console.log(e);
        })

        await mediaModel.create({
            name: name,
            file: path,
            email:email,
        })

        res.json({
            message: "file uploaded",
            success: true,
        })
    } catch (e) {
        console.log(e);
    }
}


exports.uploadCloudinary = async function (req, res) {
    try {
        const name = req.body.name;
        const email = req.body.email;
        const file = req.files.imageFile;

        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            upload_preset:"cloudinaryMedia"
        });
        await mediaModel.create({
            name: name,
            file: result.url, 
            email:email,
        });
        res.json({
            message: "image uploaded to cloudinary",
            success: true,
        })
    } catch (e) {
        console.log(e)
    }
}   