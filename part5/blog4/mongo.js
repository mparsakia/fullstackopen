// ******************************************************************
// Backend 4 Code -- CLI MongooDB Interface w Mongoose
// Run command: node mongo.js <password> -- prints db to console
// node mongo.js <password> args...
// ******************************************************************
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://mikep17:${password}@cluster0.qjigu.mongodb.net/blogdb?retryWrites=true&w=majority`;

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
 
const Blog = mongoose.model('Blog', blogSchema);

// PRINT ALL IN DATABASE
if (process.argv.length == 3) {
  console.log("printing database: \n");

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  Blog.find({}).then((result) => {
    result.forEach((blg) => {
      console.log(blg);
    });
    mongoose.connection.close();
  });
}