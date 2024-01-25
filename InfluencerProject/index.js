//!Project Dependencies
const express = require('express');
const morgan = require('morgan');

//! Data Dependencies
const influencerData = require('./influencer_data.json');

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    if (Object.keys(req.query).length === 0) {
        return res.json(influencerData)
    } else {
        const { sort } = req.query;

        if (sort === "asc") {
            return res.json(influencerData.influencers.sort((a, b) => { return a.totalFollowerCount - b.totalFollowerCount }))
        } else if (sort === "desc") {
            return res.json(influencerData.influencers.sort((a, b) => { return b.totalFollowerCount - a.totalFollowerCount }))
        }

        return res.json(influencerData)
    }
})

app.use("/influencers", require("./routes/influencers"))

app.use("/socials", require("./routes/socials"))

app.use("/brands", require("./routes/brands"))

app.use("/category", require("./routes/category"))

app.use("/country", require("./routes/country"))

app.use("*", (req, res) => {
    res.status(404).send("Page not found")
})

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.message || "Internal Server Error")
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
