const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const communityController = require("../controllers/community");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/buddies', communityController.getBuddies)
router.put('/addbuddy/:id', communityController.addBuddy)
router.put('/removeFriend/:id', communityController.removeBuddy)

module.exports = router;