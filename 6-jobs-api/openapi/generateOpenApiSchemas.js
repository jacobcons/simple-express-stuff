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

// read in docs and add the schemas
const openApiDocsPath = basePath('openapi', 'openapi.json');
const openApiDocs = await readJson(openApiDocsPath);
openApiDocs.components.schemas = openApiSchemas;

// write to the docs with the now added schemas
await writeJson(openApiDocsPath, openApiDocs, { spaces: 2 });
