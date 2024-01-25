import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises'
import images from '../data/images.json' assert { type: "json" };
import { getEncryptedText } from './encrypterDecrypter.js';

const uploadController = async (req, res) => {
    console.time('upload');

    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'uploaderproject/',
        use_filename: true,
        unique_filename: true,
        resource_type: 'image',
    })

    const imageObj = {
        name: result.original_filename,
        size: result.bytes,
        url: result.secure_url,
        format: result.format,
        folder: result.folder,
        id: result.public_id,
        assetId: result.asset_id,
    }

    images.push(imageObj);

    const encryptedToken = getEncryptedText(imageObj);

    await fs.writeFile('data/images.json', JSON.stringify(images, null, 2))
    await fs.unlink(req.file.path, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log('file deleted') // if file deleted successfully, log this
        }
    })

    res.statusMessage = 'POST request successful';
    console.timeEnd('upload');
    res.render('urlSide', {
        message: 'File uploaded successfully',
        token: encryptedToken,
        url: imageObj.url,
    })
}

export default uploadController;