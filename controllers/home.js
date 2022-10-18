const User = require('../models/User');
const Entry = require('../models/Entry');
const Goal = require('../models/Goal');
const Race = require('../models/Race');
const Buddy = require('../models/User');
const cloudinary = require("../middleware/cloudinary");

module.exports = {
// Get the Login Index Page
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getDashboard: async (req, res) => {
    try {
      const entries = await Entry.find({user: req.user.id});
      const goals = await Goal.find({user: req.user});
      const races = await Race.find({user: req.user});
      // Redirects the user to the dashboard after the post.
      res.render("dashboard", { 
        entries: entries, 
        user: req.user, 
        userId: req.user.id,
        goals: goals,
        races: races,
      });
  } catch (err){
      console.error(err)
      res.render('error/500')
      }

  },
  getCommunity: async (req, res) => {
    try{
      const entries = await Entry.find({ status: 'public' })
          .populate('entries') 
          .sort({ createdAt: 'desc'})
          .lean() 

          res.render('community', { 
            entries: entries, body: req.body, userName: req.user.userName
          }
          )
  } catch (err) {
      console.error(err)
      res.render('error/500')

  }
},
getProfile: async (req, res) => {
  try {
    let user = await User.findById({_id: req.params.id})
    const entries = await Entry.find({
      user: req.params.userId,
      status: 'public',
    }).populate({path: 'buddies', select: 'userName'}).sort({ createdAt: 'desc'}).lean()
    // Using the index page we already built and passing in different information
    res.render('profile', {
      entries: entries, 
      user: user,
      userId: req.user._id,
      buddies: user.buddies
     
    })
    console.log(`the user is ${user}`)
  } catch (err){
    console.log(err);
  }
},
getUserProfile: async (req,res) =>{
  try {
    const entries = await Entry.find({user: req.user.id});
    const goals = await Goal.find({user: req.user});
    const races = await Race.find({user: req.user});
      let user = await User.findById({_id: req.user.id}).populate({path: 'buddies', select: 'userName'})
      res.render('profile.ejs', {
        entries: entries, 
        user: req.user, 
        goals: goals,
        races: races,
        userId: req.user._id, 
        buddies: user.buddies})
  } catch (err) {
      console.log(err)
  }
},
getBuddies: async (req,res) =>{
  try {
      const userItems = await User.find({_id: { $ne: req.user.id}})
      let user = await User.findById({_id: req.user.id}).populate({path: 'buddies', select: 'userName'})
      const arr = user.friends.map(friend => friend._id)
      res.render('buddies.ejs', {user: userItems, buddiesArr: arr, buddies: user.buddies, userName: req.user.names})
  } catch (err) {
      console.log(err)
  }
},
 // Adds image from 'profile.ejs' 
 addImg: async (req,res) => {
  try {
      const result = await cloudinary.uploader.upload(req.file.path);
      await User.findByIdAndUpdate({_id: req.user.id},{
          img: result.secure_url,
          cloudinaryId: result.public_id,
      })
      res.redirect('dashboard')
  } catch (err) {
      console.log(err)
  }
}
};
