import j2s from 'joi-to-swagger';
import * as authSchemas from '../src/schemas/auth.schemas.js';
import * as jobSchemas from '../src/schemas/jobs.schemas.js';
import { updateUserSchema } from '../src/schemas/users.schemas.js';
import { readJson, writeJson } from 'fs-extra/esm';
import { basePath } from '../src/utils/path.utils.js';

const schemas = { ...authSchemas, ...jobSchemas, updateUserSchema };

const openApiSchemas = {};

// generate open api schemas based on joi schemas
for (const schemaName in schemas) {
  const schema = schemas[schemaName];
  const openApiSchema = j2s(schema).swagger;
  openApiSchemas[schemaName] = openApiSchema;
}

// write schemas to json file
await writeJson(basePath('openapi', 'schemas.json'), openApiSchemas, {
  spaces: 2,
});
