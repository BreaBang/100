const Entry = require('../models/Entry');
const Comment = require("../models/Comment");
const Goal = require("../models/Goal");
const Race = require("../models/Race");
const Club = require("../models/Club")
/* Leaving for later, not allowing images at this time. */
const cloudinary = require("../middleware/cloudinary");


module.exports = {
// Get Journal Entries
getEntry: async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    const comments = await Comment.find({entry: req.params.id}).sort({ createdAt: "asc" }).lean();
    res.render("entries", { entry: entry, user: req.user, comments: comments });
  } catch (err) {
    console.log(err); 
  }
},
// Add Journal Entry
getAddPage: async (req, res) => {
    try {
      res.render("add");
    } catch (err){
      console.log(err);
    }
  },
// Create Journal Entry
createEntry: async (req, res) => {
  try {
    await Entry.create({
      status: req.body.status,
      runType: req.body.runType,
      completed: req.body.completed,
      title: req.body.title,
      body: req.body.body,
      thoughts: req.body.thoughts,
      emotions: req.body.emotions,
      duration: req.body.duration,
      distance: req.body.distance,
      userName: req.user.userName,
      user: req.user.id,
    }
    );
    console.log(req.body)
    console.log('Entry has been added')
    // Redirects the user to the dashboard after the post.
    res.redirect('/dashboard') // leave slash or path breaks
  } catch (err) {
    console.log(err)
  }
},
// Delete Journal Entry
  deleteEntry: async (req, res) => {
    try {
      // Find post by id
      // Delete post from db
      await Entry.remove({ _id: req.params.id });
      console.log("Deleted Entry");
      // Render (or show) the profile page
      res.redirect("/dashboard");
    } catch (err) {
      // if there is an error for some reason, it will still render the profile page. 
      res.redirect("/dashboard");
    }
  },
};