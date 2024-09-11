if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const ExpressError = require('./utilites/expressError')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const localStrategy = require('passport-local')
const User = require('./models/user')
const userRoutes = require('./routes/users')
const dbUrl = process.env.DB_URL
const MongoStore = require('connect-mongo');
const PORT = process.env.PORT || 3000;



mongoose.connect(dbUrl)
.then(()=>{
    console.log('Connected to database')
})
.catch((err)=>{
    console.log('Error')
    console.log(err)
})

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'thisshouldbeabettersecret!'
    }
});

const app = express()
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.engine('ejs', ejsMate)

const sessionConfig = {
    store,
    secret: 'thisisasecret', 
    resave: false, 
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7,
        httpOnly: true
    }
}

app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/', userRoutes)
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res)=>{
    res.render('home')
})

app.all('*', (req, res, next)=>{
    next(new ExpressError('Page not found', 404))
})

app.use((err, req, res, next) => {
    const { message, status=500 } = err
    if(!err.message) err.message = 'Something went wrong'
    res.status(status).render('error', { err })
})

module.exports = app