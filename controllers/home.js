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
        _id: req.user.id,
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
getUserProfile: async (req,res) =>{
  try {
      const userItems = await User.findById(req.params.id)
      const entry = await Entry.find({user: req.params.id})
      const goal = await Goal.find({user: req.params.id})
      const race = await Race.find({user: req.params.id})
      let user = await User.findById({_id: req.params.id}).populate({path: 'friends', select: 'userName'})
      res.render('profile.ejs', {
        goals: goal, 
        races: race, 
        userName: req.user.names, 
        user: userItems, 
        entries: entry, 
        userId: req.user._id, 
        buddies: user.buddies
      })
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
