import SchemaBuilder from '@pothos/core';
import ErrorsPlugin from '@pothos/plugin-errors';
import PrismaPlugin from '@pothos/plugin-prisma';
import type PrismaTypes from '@pothos/plugin-prisma/generated';

import { prisma } from './db';

export const builder = new SchemaBuilder<{
	PrismaTypes: PrismaTypes;
}>({
	plugins: [PrismaPlugin, ErrorsPlugin],
	prisma: {
		client: prisma,
	},
});

builder.objectType(Error, {
	name: 'Error',
	fields: (t) => ({
		message: t.exposeString('message'),
	}),
});

builder.queryType({});
builder.mutationType({});
