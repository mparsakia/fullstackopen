// ******************************************************************
// controller for users and router .@ /api/users
// ******************************************************************


const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const mongooseUniqueValidator = require('mongoose-unique-validator');


usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
  });
  response.json(users);
});



usersRouter.post('/', async (request, response) => {
  const body = request.body;

  if (body.password.length < 3) {
    return response.status(400).json({ error: 'password shorter than 3 chars not allowed' })
  }

  if (body.username.length === undefined) {
    return response.status(400).json({ error: 'undefined/null username not allowed' })
  }

  if (body.username.length < 3) {
    return response.status(400).json({ error: 'username shorter than 3 chars not allowed' })
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
})

module.exports = usersRouter