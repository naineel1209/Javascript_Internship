const { Router } = require('express');
const router = Router({ mergeParams: true });
const influencerData = require('../influencer_data.json');


//! Path - /brands
// router.get('/', (req, res) => {
// })

router.get('/status/available', (req, res) => {
    const set = new Set();

    influencerData.influencers.forEach(item => {
        item.brands.forEach(brand => {
            set.add(brand.contactStatus)
        })
    })

    return res.json(Array.from(set))
})

router.get('/:type', (req, res) => {
    const { type } = req.params;
    console.log(type)

    const influencer = influencerData.influencers.filter(item => {
        return item.brands.find(brand => brand.contactStatus.toLowerCase() === type.toLowerCase());
    })

    return res.json(influencer)
})


module.exports = router;