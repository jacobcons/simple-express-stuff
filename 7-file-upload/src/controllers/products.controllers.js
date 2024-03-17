import { knex } from '../db/connection.js';
import { TABLES } from '../constants/tables.constants.js';

export const getProducts = async (req, res) => {
  const products = await knex(TABLES.PRODUCT).select('*');
  res.json(products);
};

export const createProduct = async (req, res) => {
  const [product] = await knex(TABLES.PRODUCT).insert(req.body).returning('*');
  res.status(201).json(product);
};
