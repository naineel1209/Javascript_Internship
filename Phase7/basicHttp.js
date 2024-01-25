const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {

    const fileStream = fs.createWriteStream('./sampleData/uploaded_image.jpg', { flags: 'w' });

    req.on('data', chunk => {
        // Write the binary data to the file stream
        fileStream.write(chunk);
    });

    req.on('end', () => {
        // Close the file stream when all data has been received
        fileStream.end();

        fileStream.on('finish', () => {
            res.statusCode = 200;
            res.end('Image uploaded successfully');
        });

        fileStream.on('error', (err) => {
            console.error(err);
            res.statusCode = 500;
            res.end('Internal Server Error');
        });
    })
}).listen(3000)