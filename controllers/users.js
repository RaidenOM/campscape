const User = require('../models/user')

module.exports.renderRegisterForm = (req, res)=>{
    res.render('users/register')
}

module.exports.registerUser = async (req, res, next)=>{
    try {
        const { username , password, email } = req.body
        const user = new User({username, email})
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, (err)=>{
            if(err) {
                next(err)
            }
            req.flash('success', 'Welcome to Campscape!')
            res.redirect('/campgrounds')
        })
    } catch(e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res)=>{
    res.render('users/login')
}

module.exports.loginUser = (req, res)=>{
    req.flash('success', 'Welcome back!')
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logoutUser = (req, res, next)=>{
    req.logout(function(err) {
        if(err) {
            next(err)
        }
        req.flash('success', 'GoodBye!')
        res.redirect('/')
    })
}