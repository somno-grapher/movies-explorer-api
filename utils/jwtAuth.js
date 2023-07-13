const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const SECRET_KEY = NODE_ENV === 'production' ? JWT_SECRET : 'super_secret';

const checkToken = (token) => jwt.verify(token, SECRET_KEY);

const signToken = (payload) => jwt.sign(
  payload,
  SECRET_KEY,
  { expiresIn: '7d' },
);

module.exports = { checkToken, signToken };
