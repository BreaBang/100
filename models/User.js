const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    unique: true,
    required: true,
  },
  email: { 
    type: String, 
    unique: true 
  },
  password: String,
  user: {
    type: String
  },
  club: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Club",
  },
  profilePhoto: {
    type: String,
  },
  buddies: 
    [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    }],
    img:
    {
      type: String,
      require: true,
      default: 'public/imgs/default.jpg',
    },
  cloudinaryId:
    {
      type: String,
      require: true,
    }
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
