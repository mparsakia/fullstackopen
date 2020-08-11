// *************************************************
// defines the mongoose schema for the blog data
// *************************************************

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    name: String
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

// const Blog = mongoose.model('Blog', blogSchema);

module.exports = mongoose.model('Blog', blogSchema);