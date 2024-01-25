import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'temp/')
    },
    filename: (req, file, callback) => {
        const uniqueSuffix = String(Date.now()).slice(-5);
        callback(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage, limits: {
        fileSize: 25 * 1024 * 1024, // 5 MB upload limit,
        files: 5 // 5 files max 
        //total files size: 5 * 25 = 125 MB
    }, preservePath: true
})

export default upload;