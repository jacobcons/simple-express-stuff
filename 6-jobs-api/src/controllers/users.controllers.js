import { knex } from '../db/connection.js';
import { TABLES } from '../constants/tables.constants.js';

const getUser = async (req, res) => {
  const { id } = req.user;
  const user = await knex(TABLES.USER)
    .first('id', 'name', 'email')
    .where({ id });
  res.json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.user;
  const [user] = await knex(TABLES.USER)
    .update(req.body)
    .where({ id })
    .returning(['id', 'name', 'email']);
  res.json(user);
};

export { getUser, updateUser };
