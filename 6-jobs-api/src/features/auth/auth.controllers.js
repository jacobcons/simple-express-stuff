import { knex, TABLES } from '../../db/db.js';
import { createError, hashPassword, createToken } from '../../utils.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await knex(TABLES.USER)
      .insert({
        name,
        email,
        password: await hashPassword(password),
      })
      .returning('id');
    const token = createToken(user.id);
    res.status(201).json({ token });
  } catch (err) {
    const UNIQUE_CONSTRAINT_VIOLATION = '23505';
    const userWithSameEmail = err.code === UNIQUE_CONSTRAINT_VIOLATION;
    if (userWithSameEmail) {
      return next(
        createError(409, `User with email ${email} is already registered`)
      );
    }
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await knex(TABLES.USER).first('id', 'password').where({ email });
  const incorrectLoginError = createError(
    401,
    "User with given email and password combination doesn't exist"
  );
  if (!user) {
    return next(incorrectLoginError);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return next(incorrectLoginError);
  }

  const token = createToken(user.id);
  res.json({ token });
};

export { login, register };
