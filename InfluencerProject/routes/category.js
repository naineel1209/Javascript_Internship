const { Router } = require('express');
const router = Router({ mergeParams: true });
const influencerData = require('../influencer_data.json');


//! Path - /category
// router.get('/', (req, res) => {
// })



router.get('/:name', (req, res) => {
    let { name } = req.params;

    // if (typeof Number(name) === "number") {
    //     name = Number(name)
    // }

    if (typeof name === "string") {
        return res.json(influencerData.influencers.filter(item => {
            return item.categories.find(category => category.name.toLowerCase() === name.toLowerCase())
        }))
    } else if (typeof Number(name) === "number") {
        return res.json(influencerData.influencers.filter(item => {
            return item.categories.find(category => category.categoryId === name)
        }))
    }
})


module.exports = router;