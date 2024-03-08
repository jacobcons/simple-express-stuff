import { knex, TABLES } from '../../db/db.js';
import { createError, hashPassword } from '../../utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const userWithSameEmail = await knex(TABLES.USER)
    .first('id')
    .where({ email });
  if (userWithSameEmail) {
    return next(
      createError(409, `User with email ${email} is already registered`)
    );
  }

  await knex(TABLES.USER).insert({
    name,
    email,
    password: await hashPassword(password),
  });
  res.status(201).json({ message: 'Account created' });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const userWithGivenEmail = await knex(TABLES.USER)
    .first('id', 'password')
    .where({ email });
  const incorrectLoginError = createError(
    401,
    "User with given email and password combination doesn't exist"
  );
  if (!userWithGivenEmail) {
    return next(incorrectLoginError);
  }

  const passwordMatch = await bcrypt.compare(
    password,
    userWithGivenEmail.password
  );
  if (!passwordMatch) {
    return next(incorrectLoginError);
  }

  const token = jwt.sign(
    { id: userWithGivenEmail.id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
  res.json({ token });
};

export { login, register };
