import { config } from 'dotenv';
config();
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
})

cloudinary.api.resources_by_asset_ids('916c9d3a5284937029f8d85cf0019fed', {

}).then(res => {
    cloudinary.api.delete_resources(res.resources.map(resource => resource.public_id), (err, res) => {
        if (err) {
            console.log("err ", err)
        }
        console.log('res')
        console.log(res)
    })
})