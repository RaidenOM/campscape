const mongoose = require('mongoose')
const Review = require('./review')
const options = {toJSON: {virtuals: true}}

const Schema = mongoose.Schema

// https://res.cloudinary.com/dnltrumxv/image/upload/v1724173620/Campscape/bblqc4rnol2laekfifkb.jpg

const imageSchema = new Schema({
        url: String,
        filename: String
})

imageSchema.virtual('thumbnail').get(function() {
    return this.url.replace('/upload', '/upload/w_200,h_200')
})

const campgroundSchema = new Schema({
    title: String,
    images: [imageSchema],
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: ['Number'],
            required: true
        }
    }
}, options)

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
        <strong>${this.title}</strong>
        <br>
        <a href="/campgrounds/${this.id}" class="btn btn-primary btn-sm" style="margin-top: 5px;">View Campground</a>
    `;
});

module.exports = mongoose.model('Campground', campgroundSchema)