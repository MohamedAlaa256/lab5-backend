const multer = require("multer");
const { imagekit } = require("../utils/imageKit");
const AppError = require("../utils/appError");

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadFiles =(isMultiple)=>{
    return async (req,res,next)=>{
        if(!req.file||(req.files && req.files.length === 0)){
         return next()
        }
        const files = isMultiple ? req.files : [req.file];

        try {
            const results = await Promise.all(
                files.map(async(file)=>{
                  return await imagekit.upload({
                    file:file.buffer,
                    fileName:`${Date.now()}-${ file.fieldname}`,
                    folder:"users"
                  })  
                })
            )
            req.imageUrls= results.map((res)=>res.url)
            next()
        } catch (error) {
            throw new AppError(error.message,500)
        }
    }
}
module.exports={
    upload,
    uploadFiles
}