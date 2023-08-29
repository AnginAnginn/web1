const multer = require("multer");

// komponen wajib yang harus ditulis saat menggunakan library multer
const tempatSimpan = multer.diskStorage({
    destination:(req,file,cb)=>{cb(null,"./images")},
    filename:(req,file,cb)=>{cb(null,Date.now()+"-"+file.originalname)}
});

function extensiGambar(req,file,cb){
    file.mimetype === "image/jpeg" || file.mimetype === "image/png"?
        cb(null,true):cb(new Error("PNG ro JPEG wae sek iso"),false);
}

const upload = multer({storage: tempatSimpan, fileFilter: extensiGambar});
//________________________________________________________________________

module.exports = upload.single("foto")