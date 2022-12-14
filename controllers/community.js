const User = require('../models/User');
const Entry = require('../models/Entry');
const Goal = require('../models/Goal');
const Race = require('../models/Race');
const Buddy = require('../models/User');
const cloudinary = require("../middleware/cloudinary");
const methodOverride = require("method-override");

module.exports = {
 getBuddies: async (req,res) =>{
    try {
        const userItems = await User.find({_id: { $ne: req.user.id}})
        let user = await User.findById({_id: req.user.id}).populate({path: 'buddies', select: 'userName'})
        const arr = user.buddies.map(buddy => buddy._id)
         res.render('community.ejs', {
            user: userItems, 
            buddiesArr: arr, 
            buddies: user.buddies, 
            userName: req.user.names})
        } catch (err) {
            console.log(err)
        }
      },
// Follow
addBuddy: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$addToSet: {buddy: req.params.id}})
        console.log('Added Buddy')
        res.redirect('/community')
    } catch (err) {
        console.log(err)
    }
},
// Unfollow 
removeBuddy: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$pull: {buddies: req.params.id}})
        console.log('Deleted Buddy')
        res.redirect('/community')
    } catch (err) {
        console.log(err)
    }
},
}