const Campground = require('../models/campground')
const { cloudinary } = require('../cloudinary/index')
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;



module.exports.index = async (req, res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', { campgrounds: campgrounds })
}

module.exports.renderNewForm = (req, res)=>{
    res.render('campgrounds/new')
}

module.exports.showCampground = async (req, res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    })
    .populate('author')
    if(!campground) {
        req.flash('error', 'Cannot find that Campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', { campground: campground })
}

module.exports.createCampground = async (req, res, next)=>{
        const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
        const campground = new Campground(req.body.campground)
        campground.geometry = geoData.features[0].geometry;
        campground.author = req.user

        campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
        
        await campground.save()
        req.flash('success', 'Successfully created a new Campground!')
        res.redirect(`/campgrounds/${campground.id}`)
}

module.exports.renderEditForm = async (req, res)=>{
    const {id} = req.params
    const campground = await Campground.findById(id)
    if(!campground) {
        req.flash('error', 'Cannot find that Campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', { campground })
}

module.exports.deleteCampground = async (req, res)=>{
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Succesfully deleted a Campground!')
    res.redirect('/campgrounds')
}

module.exports.updateCampground = async (req, res)=>{
    const {id} = req.params
    const campground = await Campground.findByIdAndUpdate(id, req.body.campground)
    const images = req.files.map(f => ({url: f.path, filename: f.filename}))
    campground.images.push(...images)

    if(req.body.deleteImages) {
        for(let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename)
        }
        await campground.updateOne({$pull: {images: {filename: {$in: req.body.deleteImages}}}})
    }

    await campground.save()
    req.flash('success', 'Successfully updated the Campground!')
    res.redirect(`/campgrounds/${id}`)
}