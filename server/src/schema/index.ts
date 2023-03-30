import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { resolve } from 'path';
import { builder } from '../builder';
import './user';

export const schema = builder.toSchema({});
console.log({ ENV: process.env.DATABASE_URL });

writeFileSync(resolve(__dirname, '../../schema.graphql'), printSchema(schema));
