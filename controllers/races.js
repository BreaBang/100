const { ensureAuth } = require('../middleware/auth');
const mongoose = require('mongoose');
const Race = require('../models/Race');
const moment = require('moment');


module.exports = {
createRace: async (req, res) => {
  try {
    await Race.create({
      race: req.body.race,
      raceDate: req.body.raceDate,
      completed: false,
      userName: req.user.userName,
      user: req.user.id,
    });
    console.log(req.body)
    console.log('Race has been added')
    res.redirect('/dashboard') // leave slash
  } catch (err) {
    console.log(err)
  }
},
markComplete: async (req, res) => {
  try {
    const race = await Race.find({ _id: req.body.raceIdFromJSFile })
    console.log(goal[0])
      try {
        await Race.findOneAndUpdate({ _id: req.body.raceIdFromJSFile }, {
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
    const race = await Race.find({ _id: req.body.raceIdFromJSFile })
    if (req.body.user === race[0].user) {
      try {
        await Race.findOneAndUpdate({ _id: req.body.raceIdFromJSFile }, {
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
deleteRace: async (req, res) => {
    try {
      await Race.remove({ _id: req.params.id });
      console.log("Deleted Race");
      res.redirect("/dashboard");
    } catch (err) { 
      res.redirect("/dashboard");
    }
  },
};