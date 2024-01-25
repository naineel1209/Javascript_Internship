const { Router } = require('express');
const router = Router({ mergeParams: true });
const influencerData = require('../influencer_data.json');


//! Path - /country
// router.get('/', (req, res) => {
// })

router.get('/available', (req, res) => {
    const set = new Set();

    influencerData.influencers.forEach(item => {
        set.add(item.country.toLowerCase())
    })

    return res.json(Array.from(set))
})

router.get('/:type', (req, res) => {
    const { type } = req.params;
    console.log(type)

    const influencers = influencerData.influencers.filter(item => item.country.toLowerCase() === type.toLowerCase())
    console.log(influencers.length)
    return res.json(influencers)
})


module.exports = router;