import { createError, randomIntegerInclusive } from '../utils.js';
import jwt from 'jsonwebtoken';

const login = (req, res, next) => {
  const { username, password } = req.body;
  const id = 19;

  if (username !== 'joe' || password !== 'bill') {
    return next(createError(401, "User doesn't exist"));
  }

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.json({ message: 'login sucessful!', token });
};

const dashboard = (req, res, next) => {
  const { min, max } = req.query;
  const secretNumber = randomIntegerInclusive(min, max);
  res.json({
    message: `Hello ${req.user.username}`,
    secret: `Your secret number is ${secretNumber}`,
  });
};

export { login, dashboard };
