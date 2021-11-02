const multer = require("multer");
const { response } = require("../utils/utils");

/**  Multer upload image */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/data-image/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    },
});

const uploadMulter = multer({
    storage: storage,
    limits: {
        fileSize: 1 * 1024 * 1024,
        files: 6
    },
    fileFilter(req, file, cb) {
        if (file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
            return cb(new Error("Only images in png, jpg, jpeg format"), false);
        }
        cb(null, true);
    },
}).array("images", 6);

exports.uploadFile = (req, res, next) => {
    try {
        uploadMulter(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json(response(400, err.message));
            }
            else if (err) {
                res.status(400).json(response(400, err.message));
            }
            else {
                next();
            }
        });
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};







// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const uploadFile = path.resolve(path.join(__dirname, '../public/uploads'));

// if (!fs.existsSync(uploadFile)) {
//   fs.mkdirSync(uploadFile, { recursive: true });
// }
// const storage = multer.diskStorage({ 
//   destination: function(req,file,cb){
//     cb(null,path.join(__dirname,'../public/uploads'));
//   },
//   filename: function(req,file,cb){
//     cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname);