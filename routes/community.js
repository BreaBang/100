const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const communityController = require("../controllers/community");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/profile/:id', homeController.getProfile)
router.get('/profile', homeController.getUserProfile)
router.get('/buddies', communityController.getBuddies)

module.exports = router;