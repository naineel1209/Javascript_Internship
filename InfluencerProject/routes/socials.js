const { Router } = require('express');
const router = Router({ mergeParams: true });
const influencerData = require('../influencer_data.json');


//! Path - /socials
// router.get('/', (req, res) => {
// })

router.get('/:type', (req, res) => {
    const { type } = req.params;
    console.log(type)

    const influencers = influencerData.influencers.filter(item => {
        return item.socialMediaAccounts.find(acc => acc.platform.toLowerCase() === type.toLowerCase());
    })

    //! to find the account which do not have the type as social media
    // const influencers = influencerData.influencers.filter(item => {
    //     let flag = true;

    //     item.socialMediaAccounts.forEach(social => {
    //         if (social.platform.toLowerCase() === type.toLowerCase()) {
    //             flag = false;
    //         }
    //     })

    //     return flag;
    // })
    console.log(influencers.length)
    return res.json(influencers)
})

router.get('/not/:type', (req, res) => {
    const { type } = req.params;
    console.log(type)

    // const influencers = influencerData.influencers.filter(item => {
    //     return item.socialMediaAccounts.find(acc => acc.platform.toLowerCase() !== type.toLowerCase());
    // })

    //! to find the account which do not have the type as social media
    const influencers = influencerData.influencers.filter(item => {
        let flag = true;

        item.socialMediaAccounts.forEach(social => {
            if (social.platform.toLowerCase() === type.toLowerCase()) {
                flag = false;
            }
        })

        return flag;
    })

    console.log(influencers.length)
    return res.json(influencers)
})


module.exports = router;