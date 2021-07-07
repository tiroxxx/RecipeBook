const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.verify = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return res.status(401).send('Access Denied');
  }

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(404).send('User not found');
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send('Not authorized to access this route');
  }
};
