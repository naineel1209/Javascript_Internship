import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises'
import images from '../data/images.json' assert { type: "json" };
import { getDecryptedText } from './encrypterDecrypter.js';

const deleteController = async (req, res) => {
    let token = req.body.token || req.query.token;

    if (!token) {
        res.statusMessage = 'Token not found';
        return res.status(406).json({
            message: 'Token not found'
        })
    }

    const decodedText = getDecryptedText(token);
    const imageObj = JSON.parse(decodedText);
    console.log(imageObj);

    const result = await cloudinary.api.resources_by_asset_ids(imageObj.assetId).then(async res => {
        console.log(res.resources.public_id)
        await cloudinary.api.delete_resources(res.resources.map(resource => resource.public_id), (err, res) => {
            if (err) {
                throw new Error(err)
            }
            console.log('res')
            console.log(res)
        });
    });

    //! second way
    // const result = await cloudinary.api.delete_resources([imageObj.id], (err, callResult) => {
    //     if (err) {
    //         throw new Error(err)
    //     }
    //     console.log(callResult)
    // })

    const filteredImages = images.filter(image => image.assetId !== imageObj.assetId);

    await fs.writeFile('data/images.json', JSON.stringify(filteredImages, null, 2))

    res.statusMessage = 'DELETE request successful';
    res.status(200).json({
        message: 'File deleted successfully',
        imageUrl: imageObj.url,
    })
}

export default deleteController;