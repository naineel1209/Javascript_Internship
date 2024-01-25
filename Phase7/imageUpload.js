const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    console.log("inside")
    if (req.method === 'POST') {

        const fileStream = fs.createWriteStream('uploaded_image.jpg', { flags: 'w' });

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
        });
    } else {
        // Handle other HTTP methods or routes as needed
        res.statusCode = 404;
        res.end('Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
