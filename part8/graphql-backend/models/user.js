const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
