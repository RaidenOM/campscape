const express = require('express')
const router = express.Router()
const User = require('../models/user')
const catchAsync = require('../utilites/catchAsync')
const passport = require('passport')
const { storeReturnTo } = require('../middleware')
const userController = require('../controllers/users')

router.get('/register', userController.renderRegisterForm)

router.post('/register', catchAsync(userController.registerUser))

router.get('/login', userController.renderLoginForm)

router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), userController.loginUser)

router.get('/logout', userController.logoutUser)


module.exports = router