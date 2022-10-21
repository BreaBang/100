const User = require('../models/User');
const Entry = require('../models/Entry');
const Goal = require('../models/Goal');
const Race = require('../models/Race');
const Buddy = require('../models/User');
const cloudinary = require("../middleware/cloudinary");

module.exports = {
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
addBuddy: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$addToSet: {buddies: req.params.id}})
        console.log('Added Buddy')
        res.redirect('/buddies')
    } catch (err) {
        console.log(err)
    }
},
// Removes follower from 'friends.ejs'
removeBuddy: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$pull: {buddies: req.params.id}})
        console.log('Deleted Buddy')
        res.redirect('/buddies')
    } catch (err) {
        console.log(err)
    }
},
}