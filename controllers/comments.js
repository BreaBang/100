const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comments")


module.exports = {
  getProfile: async (req, res) => {
    try {
    // Explanation for below lines
    // Post is from the model - use the post model, look in the post collection, find the user by id. 
      const posts = await Post.find({ user: req.user.id });
      // Show that user's data on the profile.ejs page. It will pass their posts and user information through. 
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      // Explanation for below lines
      // .lean is just mongoose
      // Post is from our model, telling it to find posts and sort them by the createdAt desc from the database
      const posts = await Post.find().sort({ createdAt: "desc" }).lean();
      // res.render is just show the feed.ejs view/page and to show the posts stored in our database. 
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      // "Post" on the below line references the post model - go into the post collection, find the post by the id.
      const post = await Post.findById(req.params.id);
      // For finding comments with the current post id/property of the post the user ison.
      const comments = await Comment.find({post: req.params.id}).sort({createdAt: "desc" }).lean();
      // "render" - show our post page. The post and user are also passing elements from the database to the view so the view can use them. 
      res.render("post.ejs", { post: post, user: req.user, comments: comments });
    } catch (err) {
      console.log(err);
    }
  },
  createComment: async (req, res) => {
    try {
      await Post.create({
        comment: req.body.comment,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      // Render (or show) the profile page
      res.redirect("/profile");
    } catch (err) {
      // if there is an error for some reason, it will still render the profile page. 
      res.redirect("/profile");
    }
  },
};