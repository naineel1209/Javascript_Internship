import { Router } from "express";
import deleteController from "../controllers/deleteController.js";


const router = Router();

router
    .route('/')
    .get((req, res) => {
        res.statusMessage = 'GET request successful';
        res.render('deleteFile')
    })
    .post(deleteController)

export default router;