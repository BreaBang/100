const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const entriesController = require("../controllers/entries");
const commentsController = require("../controllers/comments");
const communityController = require("../controllers/community");
const goalController = require("../controllers/goals");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/dashboard", ensureAuth, homeController.getDashboard);
router.get("/community", ensureAuth, homeController.getCommunity);
router.get("/add", ensureAuth, entriesController.getAddPage);
router.post("/createComment/:id", commentsController.createComment);
router.put('/addProfileImg', upload.single("file"), homeController.addImg);
router.get('/entries/profile/:id', homeController.getUserProfile);


module.exports = router;
