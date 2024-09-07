const express = require('express')
const router = express.Router({mergeParams: true})
const { validateReview, isLoggedIn, isReviewOwner } = require('../middleware')
const catchAsync = require('../utilites/catchAsync')
const Review = require('../models/review')
const Campground = require('../models/campground')
const reviewController = require('../controllers/reviews')


router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewOwner, catchAsync(reviewController.deleteReview))

module.exports = router