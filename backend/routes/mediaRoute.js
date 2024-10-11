const {Router} =  require("express");
const mediaRouter = Router();

const {localFileUpload,uploadCloudinary} = require('../controllers/mediaController');

mediaRouter.post('/localFileUpload',localFileUpload);
mediaRouter.post('/uploadCloud',uploadCloudinary);

module.exports = mediaRouter;