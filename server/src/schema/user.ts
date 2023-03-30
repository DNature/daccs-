import { builder } from '../builder';
import { prisma } from '../db';

builder.prismaObject('User', {
	fields: (field) => ({
		id: field.exposeInt('id'),
		email: field.exposeString('email', { nullable: true }),
		firstName: field.exposeString('firstName', { nullable: true }),
		lastName: field.exposeString('lastName', { nullable: true }),
		phoneNumber: field.exposeString('phoneNumber', { nullable: true }),
		accountNumber: field.exposeString('accountNumber', { nullable: true }),
		city: field.exposeString('city', { nullable: true }),
	}),
});

const UserUpdateInput = builder.inputType('UserUpdateInput', {
	fields: (t) => ({
		email: t.string(),
		firstName: t.string(),
		lastName: t.string(),
		city: t.string(),
	}),
});

const UserCreateInput = builder.inputType('UserCreateInput', {
	fields: (t) => ({
		email: t.string({ required: true }),
		firstName: t.string({ required: true }),
		lastName: t.string({ required: true }),
		city: t.string({ required: true }),
		phoneNumber: t.string({ required: true }),
		accountNumber: t.string({ required: true }),
	}),
});

builder.queryFields((t) => ({
	allUsers: t.prismaField({
		type: ['User'],
		resolve: (query) => prisma.user.findMany({ ...query }),
	}),
	user: t.prismaField({
		type: 'User',
		nullable: true,
		args: {
			id: t.arg.int({ required: true }),
		},
		resolve: (query, _, { id }) =>
			prisma.user.findUnique({
				...query,
				where: {
					id,
				},
			}),
	}),
}));

builder.mutationFields((t) => ({
	// Ideally, I'd validate the schema
	createUser: t.prismaField({
		type: 'User',
		args: {
			data: t.arg({
				type: UserCreateInput,
				required: true,
			}),
		},
		resolve: (query, _, { data }) => prisma.user.create({ ...query, data }),
	}),
	updateUser: t.prismaField({
		type: 'User',
		errors: {
			types: [Error],
		},
		args: {
			id: t.arg.int({ required: true }),
			data: t.arg({
				type: UserUpdateInput,
				required: true,
			}),
		},
		resolve: async (query, _, { data, id }) => {
			const user = await prisma.user.findUnique({
				where: { id: id },
			});

			if (!user) {
				throw new Error('Invalid user ID');
			}

			return prisma.user.update({
				...query,
				data: {
					email: data.email ?? user.email,
					firstName: data.firstName ?? user.firstName,
					lastName: data.lastName ?? user.lastName,
					city: data.city ?? user.city,
				},
				where: { id: user?.id },
			});
		},
	}),
}));
