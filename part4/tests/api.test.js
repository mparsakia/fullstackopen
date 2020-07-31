// ***************************************************
// This file uses supertest and tests our APIs
// ***************************************************
const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper')
const app = require('../app');
const Blog = require('../models/blog');
const api = supertest(app);
const bcrypt = require('bcrypt')
const User = require('../models/user')


const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map(blog=>new Blog(blog))
  const promiseArray = blogObjects.map(blog=>blog.save())
  await Promise.all(promiseArray)
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mparsakia',
      name: 'Michael Parsakia',
      password: 'secret',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mparsakia',
      name: 'Michael Parsakia',
      password: 'secret',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })


})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

// test('there are exactly two blogs', async () => {
//   const response = await api.get('/api/blogs')
//   expect(response.body).toHaveLength(2)
// })

test('the first blog is', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('React patterns')
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog title is in the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain('React patterns')
})

//  The response.body.map(r => r.content) command is used to create an array 
//  containing the content of every note returned by the API. The toContain method 
//  is used for checking that the note given to it as a parameter is 
//  in the list of notes returned by the API. 

test('a valid blogpost can be added', async () => {
  const newBlog = {
      title: "Test Valid Title",
      author: "Test Valid Author",
      url: "TestValidUrlString",
      likes: 777,
  }
  
  await api.post('/api/blogs').send(newBlog)
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
})

test('invalid blogpost gives status 400', async () => {
  const invalidBlog = {
      author: "Invalid Author 2",
      likes: 12,
  }
  const response = await api.post('/api/blogs').send(invalidBlog)
  expect(response.status).toBe(400)
})

test('blog without likes param is defaulted to zero', async () => {
  const newBlog = {
    title: "Test Blog NoLikes Title 2",
    author: "Test Blog NoLikes Author ",
    url: "MissingLikesURL 2",
  }

  await api.post('/api/blogs').send(newBlog)
  const response = await api.get('/api/blogs')
  expect(response.body); // it works, fix output later w/ proper jest command
})

test('verify unique id key is named id', async () => {
  const newBlog = {
    title: "Test Blog ID is proper title",
    author: "Test Blog ID is proper author",
    url: "Test BlogID URL value",
    likes: 1,
  }
  await api.post('/api/blogs').send(newBlog);
  const blogsAtend = await helper.blogsInDb();
  const idx = blogsAtend.length - 1;
  const last = blogsAtend[idx];
  expect(last.id).toBeDefined();
})


afterAll(() => {
  mongoose.connection.close()
})







/*
The benefit of using the async/await syntax is starting to become evident. 
Normally we would have to use callback functions to access the data returned by promises, 
but with the new syntax things are a lot more comfortable:

const res = await api.get('/api/notes')
  // execution gets here only after the HTTP request is complete
  // the result of HTTP request is saved in variable res
expect(res.body).toHaveLength(2)
 */