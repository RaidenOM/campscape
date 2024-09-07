const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
require('dotenv').config();
const dbUrl = process.env.DB_URL
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

mongoose.connect(dbUrl)
.then(()=>{
    console.log('Connected to database')
})
.catch((err)=>{
    console.log('Error')
    console.log(err)
})

const sample = (array) => {
    return array[Math.floor(Math.random()*array.length)]
}

const seedDB = async ()=>{
    await Campground.deleteMany({})
    for(let i=1; i<=200; i++) {
        const randomNumber = Math.floor(Math.random()*1000)
        const price = Math.floor(Math.random()*20) + 10;
        location = `${cities[randomNumber].city}, ${cities[randomNumber].state}`
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            location,
            images: [ 
                {
                    url: 'https://res.cloudinary.com/dnltrumxv/image/upload/v1724173620/Campscape/bblqc4rnol2laekfifkb.jpg',
                    filename: 'Campscape/bblqc4rnol2laekfifkb'
                },
                {
                    url: 'https://res.cloudinary.com/dnltrumxv/image/upload/v1724187463/Campscape/o4cbz4cifufc6eknmrfx.jpg',
                    filename: 'Campscape/o4cbz4cifufc6eknmrfx'
                },
                {
                    url: 'https://res.cloudinary.com/dnltrumxv/image/upload/v1724173623/Campscape/lfucf5mddqkl7xfc8bpr.jpg',
                    filename: 'Campscape/lfucf5mddqkl7xfc8bpr'
                },
                {
                    url: 'https://res.cloudinary.com/dnltrumxv/image/upload/v1724186568/Campscape/cviygl4iyvebcvtcnpoc.jpg',
                    filename: 'Campscape/cviygl4iyvebcvtcnpoc'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, consequuntur. Esse delectus id iure odio debitis fuga maxime ipsa, enim, quod accusamus aperiam dolore error eius, ratione expedita accusantium odit.',
            price: price,
            author: '66c38412cf35864dae260eab',
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[randomNumber].longitude,
                    cities[randomNumber].latitude
                ]   
            }
        })
        await camp.save()
    }
}

seedDB().then(()=>{
    mongoose.connection.close()
})