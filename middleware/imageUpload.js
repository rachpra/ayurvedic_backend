const multer = require('multer') //for install npm i multer --save
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        //     req.fileValidationError = 'Only image files are allowed!';
        //     return cb(new Error('Only image files are allowed!'), false);

        // }
        cb(null, './images')

    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
})
const fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype=='image/jpg') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})
module.exports = upload
