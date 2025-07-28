const multer  = require('multer');
const path = require('path')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
   const ext = path.extname(file.originalname)
   const fileName = `${Date.now()}-${ file.fieldname}${ext}`
   cb(null,fileName)
  }
})

const upload = multer({ storage: storage })

module.exports={
    upload
}