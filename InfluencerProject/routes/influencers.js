const { Router } = require('express');
const router = Router({ mergeParams: true });
const influencerData = require('../influencer_data.json');


//! Path - /influencers
// router.get('/', (req, res) => {
// })



router.get('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)

    const influencer = influencerData.influencers.find(item => (Number(item.id) === Number(id)))
    return res.json(influencer)
}).delete('/:id', (req, res) => {
    const { id } = req.params;
    console.log(id)

    const influencer = influencerData.influencers.filter(item => (Number(item.id) !== Number(id)))
    influencerData.influencers = influencer;
    return res.json(influencer)
})


//! influencerTypes
router.get('/type/available', (req, res) => {
    const set = new Set();

    influencerData.influencers.forEach(item => {
        set.add(item.influencerType)
    })

    return res.json(Array.from(set))
})

router.get('/type/:type', (req, res) => {
    const { type } = req.params;
    console.log(type)

    const influencers = influencerData.influencers.filter(item => item.influencerType.toLowerCase() === type.toLowerCase())
    return res.json(influencers)
})

module.exports = router;