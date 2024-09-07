const Campground = require('./models/campground')
const Review = require('./models/review')
const joi = require('joi')
const ExpressError = require('./utilites/expressError')

module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in to complete this action')
        return res.redirect('/login')
    }
    next()
}

module.exports.storeReturnTo = (req, res, next) => {
    if(req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo
    }
    next()
}

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params
    const campground = await Campground.findById(id)
    if(!campground.author.equals(req.user.id)) {
        req.flash('error', 'You do not have permissions to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.isReviewOwner = async (req, res, next) => {
    const { id, reviewId } = req.params
    const review = await Review.findById(reviewId)
    if(!review.author.equals(req.user.id)) {
        req.flash('error', 'You do not have permissions to do that')
        return res.redirect(`/campgrounds/${id}`)
    }
    next()
}

module.exports.validateCampground = (req, res, next) => {
    const campgroundSchema = joi.object({
        campground: joi.object({
            title: joi.string().required(),
            price: joi.number().required().min(0),
            location: joi.string().required(),
            // image: joi.string().required(),
            description: joi.string().required()
        }).required(),
        deleteImages: joi.array()
    })
    const { error } = campgroundSchema.validate(req.body)
    if(error) {
        const message = error.details.map(e => e.message).join(',')
        throw new ExpressError(message, 400)
    }else {
        next()
    }
}

module.exports.validateReview = (req, res, next) => {
    const reviewSchema = joi.object({
        review: joi.object({
            rating: joi.number().required().min(1).max(5),
            body: joi.string().required()
        }).required()
    })
    const { error } = reviewSchema.validate(req.body)
    if(error) {
        const message = error.details.map(e => e.message).join(',')
        throw new ExpressError(message, 400)
    }else {
        next()
    }
}