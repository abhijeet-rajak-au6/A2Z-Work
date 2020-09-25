const multer = require("multer");
const dotenv = require("dotenv"); 
const path = require("path");


dotenv.config();   

const injectFileName = function(originalname){

    var extname = path.extname(originalname);
    originalname.replace(extname,'')+"-" + Date.now();
    console.log(originalname);
    return originalname;

}
const multerConfig = {

    storage: multer.memoryStorage({
        destination:"uploads/",
        filename: function(req,file,cb){
            cb(null,injectFileName(file.originalname))
        }
    }),
    limits:{
        fileSize: 1024**1024*2
    
    },
    fileFilter: function(req,file,cb){


        try{

            console.log("mime type =",file.mimetype)
            if(file.mimetype === "image/jpeg" || file.mimetype ==="image/png" || file.mimetype ==="image/jpg" || file.mimetype ==="image/svg" || file.mimetype ==="image/svg+xml" || file.mimetype==="application/pdf")
            {
                cb(null,true);
            }
            else{
                var newError = new Error("File Type is in correct");
                newError.name="MulterError";
                cb(newError,false);
            }

        }
        catch(err){
            console.log(err.message)
            return res.status(404).send({
                msg:err.message
            })
        }
    }
}


const upload = multer(multerConfig);
module.exports = upload;