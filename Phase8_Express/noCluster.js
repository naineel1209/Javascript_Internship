const http = require('node:http');

const server = http.createServer(async (req, res) => {
    if (req.url === '/') {
        res.end('Home Page')
    } else if (req.url === '/slow') {
        console.log('Slow Page')
        //making this page extremely slow
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                console.time('Slow Page Timer')

                for (let i = 0; i < 1e10; i++) { }

                console.timeEnd('Slow Page Timer')

                res.end('Slow Page')
                resolve()
            }, 5000)
        })

    }
})

server.listen(5000, () => {
    console.log('Server listening on port 5000')
})