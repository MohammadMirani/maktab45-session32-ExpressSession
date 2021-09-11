const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxLength: 30,
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 40,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      console.log(err);
      return next();
    }
    user.password = hash;
    return next();
  });
});

module.exports = mongoose.model("user", userSchema);
