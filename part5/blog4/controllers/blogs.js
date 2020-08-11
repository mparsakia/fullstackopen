// ************************************************
// blogs.js handles routing related to the blog
// remember all paths must be relative to /api/
// it is defined in app.js as  app.use('/api/', blogRouter)
// ************************************************

const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog'); 
const User = require('../models/user')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null;
}

blogRouter.get("/blogs", async (request, response) => {
  const blogposts = await Blog.find({}).populate("user", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
    user:1
  });
  response.json(blogposts.map(bp => bp.toJSON()))
})




blogRouter.post("/blogs", async (request, response, next) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(body.title == 0 || body.title == undefined) {
    if(body.url == 0 || body.url == undefined) {
      response.status(400).end();
      return;
    }
  }

  const blog = new Blog({
    title: body.title || 0,
    author: body.author,
    url: body.url || 0,
    likes: body.likes === undefined ? 0 : body.likes,
    user: { id: user._id, username: user.username, name: user.name },
  });
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog.toJSON())
})




blogRouter.get("/blogs/:id", async (request,response) => {
  const blogs = await Blog.findById(request.params.id);
  if(blogs){
    response.json(blogs.toJSON());
  }else{
    response.status(404).end();
  }
})

blogRouter.put('/blogs/:id', (request, response, next) => {
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  .then(updatedBlog => {
    response.json(updatedBlog)
  })
  .catch(error => next(error))
})


blogRouter.delete('/blogs/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id);
  const blog = await Blog.findById(request.params.id);
  const deleteid = request.params.id.toString();




  // check the blogs creator id to the user requesting id.
  if (blog.user.id.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'you are not the owner of this blogpost, delete not allowed.' })
  }

  // remove the blog if we passed the if check above & update the user blogs excluding the "deleted" blog
  await blog.remove();
  console.log("Post Deleted Successfully -- ID of Deleted: ", deleteid);

  user.blogs = user.blogs.filter(b => b.id.toString() !== deleteid)
  await user.save()
  response.status(204).end()
  })

module.exports = blogRouter;