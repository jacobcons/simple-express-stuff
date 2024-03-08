import { knex, TABLES } from '../db/db.js';
import { createError } from '../utils.js';

const getProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  let { page, limit } = req.query;

  let query = knex(TABLES.PRODUCT);
  if (featured != null) {
    query = query.where({ featured });
  }

  if (company != null) {
    query = query.where({ company });
  }

  if (name != null) {
    query = query.whereILike('name', `%${name}%`);
  }

  if (sort != null) {
    query = query.orderBy(sort);
  }

  if (fields != null) {
    query = query.select(fields);
  }

  if (numericFilters != null) {
    for (const filter of numericFilters) {
      query = query.where(...filter);
    }
  }

  if (page != null || limit != null) {
    page = page != null ? page : 1;
    limit = limit != null ? limit : 10;
    const offset = (page - 1) * limit;
    query = query.offset(offset).limit(limit);
  }

  console.log(query.toSQL());
  res.json(await query);
};

const getProductsStatic = async (req, res, next) => {
  const products = await knex(TABLES.PRODUCT)
    .select('name', 'price')
    .where('price', '>', 30)
    .orderBy('price');
  res.json(products);
};

export { getProducts, getProductsStatic };
