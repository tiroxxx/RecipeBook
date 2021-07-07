const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../utils/validation');

exports.register = async (req, res) => {
  // Input Validation
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if user already exists
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) return res.status(400).send('Username already exists');

  // Create New User
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: '30min',
    });
    res
      .header('auth-token', token)
      .send({ userId: savedUser._id, token: token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  // Input Validation
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // Check if username exists
  const user = await User.findOne({ username: req.body.username });
  if (!user) return res.status(400).send('username was not found');
  // Check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid password');

  try {
    // Create and assign token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: '30min',
    });
    res.header('auth-token', token).send({ userId: user._id, token: token });
  } catch (err) {
    res.status(400).send(err);
  }
};
