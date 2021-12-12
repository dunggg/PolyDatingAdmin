let multer = require("multer");
let { response } = require("../utils/utils");

/**  Multer upload image */
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/data_images/');
    },
    filename: (req, file, cb) => {
        let uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    },
});

let uploadMulter = multer({
    storage: storage,
    limits: {
        fileSize: 3 * 1024 * 1024,
        files: 6
    },
    fileFilter(req, file, cb) {
        if (file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
            return cb(new Error("Chỉ được chọn hình ảnh có định dạng jpg"), false);
        }
        cb(null, true);
    },
}).array("images", 6);

let uploadFile = (req, res, next) => {
    try {
        uploadMulter(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json(response(400, "Field Required", err.message));
            }
            else if (err) {
                res.status(400).json(response(400, "Field Required", err.message));
            }
            else {
                next();
            }
        });
    } catch (error) {
        res.status(500).json(response(500, "Error", error.message));
    }
};

module.exports = uploadFile;