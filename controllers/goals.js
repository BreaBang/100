const { ensureAuth } = require('../middleware/auth');
const mongoose = require('mongoose');
const Goal = require("../models/Goal");
const Entry = require("../models/Entry");


module.exports = {
createGoal: async (req, res) => {
  try {
    await Goal.create({
      goal: req.body.goal,
      completed: false,
      userName: req.user.userName,
      user: req.user.id,
    });
    console.log(req.body)
    console.log('Goal has been added')
    res.redirect('/dashboard') // leave slash
  } catch (err) {
    console.log(err)
  }
},
markComplete: async (req, res) => {
  try {
    const goal = await Goal.find({ _id: req.body.goalIdFromJSFile })
    console.log(goal[0])
      try {
        await Entry.findOneAndUpdate({ _id: req.body.goalIdFromJSFile }, {
          completed: true
        })
        console.log('Marked Complete')
        res.json('Marked Complete')

      } catch (err) {
        console.log(err)
      }
  } catch (err) {
    console.log(err)
  }
},
markIncomplete: async (req, res) => {
  try {
    const goal = await Goal.find({ _id: req.body.goalIdFromJSFile })
    if (req.body.user === goal[0].user) {
      try {
        await Goal.findOneAndUpdate({ _id: req.body.goalIdFromJSFile }, {
          completed: false
        })
        console.log('Marked Incomplete')
        res.json('Marked Incomplete')
      } catch (err) {
        console.log(err) 
      }
    }
  }
  catch (err) {
    console.log(err)
  }
},
deleteGoal: async (req, res) => {
    try {
      const goal = await Goal.findById({ _id: req.params.id });
      await Goal.remove({ _id: req.params.id });
      console.log("Deleted Goal");
      res.redirect("/dashboard");
    } catch (err) { 
      res.redirect("/dashboard");
    }
  },
};