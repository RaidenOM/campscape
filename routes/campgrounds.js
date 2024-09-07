const express = require('express')
const router = express.Router({mergeParams: true})
const Campground = require('../models/campground')
const catchAsync = require('../utilites/catchAsync')
const {validateCampground, isLoggedIn, isOwner} = require('../middleware')
const campgroundController = require('../controllers/campgrounds')
const multer = require('multer')
const { storage } = require('../cloudinary/index')
const upload = multer({ storage })

router.get('/', catchAsync(campgroundController.index))

router.get('/new', isLoggedIn, campgroundController.renderNewForm)

router.post('/', isLoggedIn, upload.array('images'), validateCampground, catchAsync(campgroundController.createCampground))

router.get('/:id/edit', isLoggedIn, isOwner, catchAsync(campgroundController.renderEditForm))

router.get('/:id', catchAsync(campgroundController.showCampground))

router.delete('/:id', isLoggedIn, isOwner, catchAsync(campgroundController.deleteCampground))

router.put('/:id', isLoggedIn, isOwner, upload.array('images'), validateCampground, catchAsync(campgroundController.updateCampground))


module.exports = router