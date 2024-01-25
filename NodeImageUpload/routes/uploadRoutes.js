import { Router } from "express";
import upload from '../config/multerConfig.js';
import uploadController from "../controllers/uploadController.js";


const router = Router();

router
    .route('/')
    .get((req, res) => {
        res.statusMessage = 'GET request successful';
        res.status(200).json({
            message: 'Send a POST request to upload a file to the server with the key "file" and the value as the file you want to upload and enctype="multipart/form-data" in the form data.'
        })
    })
    .post(upload.single('file'), uploadController)

export default router;