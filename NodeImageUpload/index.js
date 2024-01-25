import { config } from 'dotenv';
config();
import 'express-async-errors';
import express from 'express';
import uploadRouter from './routes/uploadRoutes.js';
import deleteRouter from './routes/deleteRoutes.js';
import upload from './config/multerConfig.js';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.set('views', 'views')

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

//!multipart/form-data is absolutely necessary for uploading files
app.get('/', (req, res) => {
    return res.render('index')
});

app.use('/upload', uploadRouter);
app.use('/delete', deleteRouter);

//error handler
app.use((err, req, res, next) => {

    res.statusMessage = 'Something went wrong';
    res.status(406).json({
        message: err.message
    })
})

app.listen(3000, () => {
    console.log(`Server is running on port 3000`)
});