const influencerData = require('./influencer')
//creating the unique objects by influencer id

const uniqInflu = {}

influencerData.forEach((influencer) => {

    //initialized the influencer id object
    if (!uniqInflu[influencer.influencerId]) {
        const { influencerId,
            name,
            gender,
            address1,
            address2,
            city,
            state,
            country,
            postalCode,
            email,
            createdAt,
            notes,
            additionalContacts,
            phoneNumber,
            influencerType,
            totalFollowerCount,
            location,
            totalShipmentCount,
            createdBy,
            creatorName,
            updatedAt,
            tier } = influencer
        uniqInflu[influencer.influencerId] = {
            influencerId,
            name,
            gender,
            address1,
            address2,
            city,
            state,
            country,
            postalCode,
            email,
            createdAt,
            notes,
            additionalContacts,
            phoneNumber,
            influencerType,
            totalFollowerCount,
            location,
            totalShipmentCount,
            createdBy,
            creatorName,
            updatedAt,
            tier
        }

        uniqInflu[influencer.influencerId].brands = [];
        uniqInflu[influencer.influencerId].categories = [];
        uniqInflu[influencer.influencerId].socialMediaAccounts = [];

    }

    //adding the brands, categories and social media accounts to the influencer id object which was initialized above
    const newBrand = {
        id: influencer.influencerBrandId,
        brandId: influencer.brandId,
        name: influencer.brandName,
        colorCode: influencer.colorCode,
        contactStatus: influencer.brandContactStatus,
        influencerStatus: influencer.influencerStatus,
        isPaid: influencer.isPaid
    }

    const uniqueBrand = {}
    uniqInflu[influencer.influencerId].brands.forEach((brand) => {
        uniqueBrand[brand.brandId] = true
    })

    if (!uniqueBrand[newBrand.brandId]) {
        uniqInflu[influencer.influencerId].brands.push(newBrand)
    }


    //!
    const newCategory = {
        id: influencer.influencerCategoryId,
        categoryId: influencer.categoryId,
        name: influencer.categoryName
    }

    const uniqueCategory = {}
    uniqInflu[influencer.influencerId].categories.forEach((category) => {
        uniqueCategory[category.categoryId] = true
    })

    if (!uniqueCategory[newCategory.categoryId]) {
        uniqInflu[influencer.influencerId].categories.push(newCategory)
    }

    //!
    const newSocialMediaAccount = {
        id: influencer.socialMediaAccountId,
        accountHandle: influencer.accountHandle,
        platform: influencer.platform,
        followers: influencer.newFollowerCount,
        fbConnected: influencer.fbConnected,
    }

    const uniqueSocialMediaAccount = {}
    uniqInflu[influencer.influencerId].socialMediaAccounts.forEach((socialMediaAccount) => {
        uniqueSocialMediaAccount[socialMediaAccount.id] = true
    })

    if (!uniqueSocialMediaAccount[newSocialMediaAccount.id]) {
        uniqInflu[influencer.influencerId].socialMediaAccounts.push(newSocialMediaAccount)
    }


    //! inefficient way
    // uniqInflu[influencer.influencerId].brands.push({
    //     id: influencer.influencerBrandId,
    //     brandId: influencer.brandId,
    //     name: influencer.brandName,
    //     colorCode: influencer.colorCode,
    //     contactStatus: influencer.brandContactStatus,
    //     influencerStatus: influencer.influencerStatus,
    //     isPaid: influencer.isPaid
    // })
    // uniqInflu[influencer.influencerId].brands = Array.from(new Set(uniqInflu[influencer.influencerId].brands.map(JSON.stringify))).map(JSON.parse)

    // uniqInflu[influencer.influencerId].categories.push({
    //     id: influencer.influencerCategoryId,
    //     categoryId: influencer.categoryId,
    //     name: influencer.categoryName
    // })
    // uniqInflu[influencer.influencerId].categories = Array.from(new Set(uniqInflu[influencer.influencerId].categories.map(JSON.stringify))).map(JSON.parse)

    // uniqInflu[influencer.influencerId].socialMediaAccounts.push({
    //     id: influencer.socialMediaAccountId,
    //     accountHandle: influencer.accountHandle,
    //     platform: influencer.platform,
    //     followers: influencer.followers,
    //     fbConnected: influencer.fbConnected,
    // })
    // uniqInflu[influencer.influencerId].socialMediaAccounts = Array.from(new Set(uniqInflu[influencer.influencerId].socialMediaAccounts.map(JSON.stringify))).map(JSON.parse)
})

// console.log(uniqInflu)

const influencerArray = Object.values(uniqInflu)
console.log((influencerArray[0]))
