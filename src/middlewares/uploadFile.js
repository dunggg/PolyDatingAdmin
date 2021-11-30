const multer = require("multer");
const { response } = require("../utils/utils");

/**  Multer upload image */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "src/public/data_images/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    },
});

const uploadMulter = multer({
    storage: storage,
    limits: {
        fileSize: 0.8 * 1024 * 1024,
        files: 6
    },
    fileFilter(req, file, cb) {
        if (file.mimetype != "image/jpg" && file.mimetype != "image/jpeg") {
            return cb(new Error("Chỉ được chọn hình ảnh có định dạng jpg"), false);
        }
        cb(null, true);
    },
}).array("images", 6);

const uploadFile = (req, res, next) => {
    try {
        uploadMulter(req, res, (err) => {
            if (err instanceof multer.MulterError || err) {
                res.status(401).json(response(401, err.message));
            }
            else {
                next();
            }
        });
    } catch (error) {
        res.status(500).json(response(500, error.message));
    }
};

module.exports = uploadFile;