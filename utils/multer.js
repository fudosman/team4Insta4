const multer = require('multer');
const aws = require('./s3')
const multerS3 = require('multer-s3');

const upload = multer({
  storage: multerS3({
    s3      : aws.s3Instance,
    bucket  : aws.bucket,
    acl     : "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata:  (req, file, cb) => {
      cb(null, {fieldName: file.fieldname});
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString()+file.originalname)
    }
  })
})

module.exports = upload;