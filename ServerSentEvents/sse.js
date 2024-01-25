const app = require('express')();

app.get('/', (req, res) => {
    res.send('hello world!!')
})

//! special endpoint for SSE -
app.get('/sse', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');

    //! write to the response object - not send - to keep the connection open
    res.write("data: hello world \n\n") //? \n\n is required to end the event and data: prefix is required to send data
})

app.use('/sse-adv', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');

    //! write to the response object - not send - to keep the connection open
    setInterval(() => {
        res.write("data: pinging to keep the connection alive \n\n");
    }, 2000)
})

app.listen(4000, () => {
    console.log('Server listening on port 4000')
})