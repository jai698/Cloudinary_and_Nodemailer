const express = require('express');
const mongoose = require('mongoose');
mongoose.set('debug', true)
const app = express();
const dotenv = require('dotenv')
dotenv.config({});
app.use(express.json());
const mediaRoute = require('./routes/mediaRoute');

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const cors = require('cors');
const cloudinary = require('cloudinary').v2

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

app.use('/api/v1/mediaUpload', mediaRoute);


async function db() {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db connected")
    } catch (e) {
        console.log(e)
    }

}

async function cloudinaryConnect() {
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
    } catch (e) {
        console.log(e)
    }

}

cloudinaryConnect();

db();
app.listen(process.env.PORT, () => {
    console.log("server started")
});