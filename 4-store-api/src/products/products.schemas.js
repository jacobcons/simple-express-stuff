import Joi from 'joi';
import { COMPANY_NAMES } from './products.constants.js';
import { knex, TABLES } from '../db/db.js';

const columnInfo = await knex(TABLES.PRODUCT).columnInfo();
const productColumns = Object.keys(columnInfo);

const getProductsSchema = Joi.object({
  featured: Joi.boolean(),
  company: Joi.string().valid(...COMPANY_NAMES),
  name: Joi.string(),
  sort: Joi.string().custom((value, helpers) => {
    /*
      e.g. query param - sort=id,-price
      sort results by given columns, negative => sorted in descending order
    */
    const columnsWithSortOrder = [];
    // extract columns
    for (const column of value.split(',')) {
      const isNegative = column.startsWith('-');
      const columnName = isNegative ? column.slice(1) : column;

      // ensure they're in the actual product table
      const isColumnProductColumn = productColumns.includes(columnName);
      if (!isColumnProductColumn) {
        return helpers.message(
          `"sort": The column ${columnName} must be one of ${productColumns}`
        );
      }

      // convert to format that can be used by knex in order to sort by said column
      const sortOrder = isNegative ? 'desc' : 'asc';
      columnsWithSortOrder.push({
        column: columnName,
        order: sortOrder,
      });
    }
    return columnsWithSortOrder;
  }),
  fields: Joi.string().custom((value, helpers) => {
    /*
      e.g. query param - fields=id,price
      only include the given columns in results
    */
    const columns = value.split(',');
    // extract columns
    for (const column of columns) {
      // ensure they're in the actual product table
      const isColumnProductColumn = productColumns.includes(column);
      if (!isColumnProductColumn) {
        return helpers.message(
          `"fields": The column ${column} must be one of ${productColumns}`
        );
      }
    }
    // convert to array
    return columns;
  }),
  numericFilters: Joi.string().custom((value, helpers) => {
    /*
      e.g. query param - numericFilters=price>10,rating<=3
      filter results using given filters
    */
    const conditionals = [];
    // extract filters
    for (const filter of value.split(',')) {
      const found = filter.match(
        /^^(?<column>[^<>=]+)(?<operator><=|<|=|>|>=)(?<value>[^<>=]+)$$/
      );

      // ensure it's of format <column><operator><value>
      if (!found) {
        return helpers.error('any.invalid');
      }

      const { column, operator, value } = found.groups;
      const numericProductColumns = ['price', 'rating'];
      const isColumnANumericProductColumn =
        numericProductColumns.includes(column);
      const isValueANumber = !isNaN(value);

      // ensure <column> is one of the numeric columns in the actual product table
      if (!isColumnANumericProductColumn) {
        return helpers.message(
          `"numericFilters": ${column} must be one of ${numericProductColumns}`
        );
      }

      // ensure <value> is a number
      if (!isValueANumber) {
        return helpers.message(`"numericFilters": ${value} must be a number`);
      }

      // convert to format that can be used by knex in order to filter
      conditionals.push([column, operator, value]);
    }
    return conditionals;
  }),
  page: Joi.number().integer().positive(),
  limit: Joi.number().integer().positive(),
});

export { getProductsSchema };
