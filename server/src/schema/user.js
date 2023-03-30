"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const builder_1 = require("../builder");
const db_1 = require("../db");
builder_1.builder.prismaObject('User', {
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
const UserUpdateInput = builder_1.builder.inputType('UserUpdateInput', {
    fields: (t) => ({
        email: t.string(),
        firstName: t.string(),
        lastName: t.string(),
        city: t.string(),
    }),
});
const UserCreateInput = builder_1.builder.inputType('UserCreateInput', {
    fields: (t) => ({
        email: t.string({ required: true }),
        firstName: t.string({ required: true }),
        lastName: t.string({ required: true }),
        city: t.string({ required: true }),
        phoneNumber: t.string({ required: true }),
        accountNumber: t.string({ required: true }),
    }),
});
builder_1.builder.queryFields((t) => ({
    allUsers: t.prismaField({
        type: ['User'],
        resolve: (query) => db_1.prisma.user.findMany(Object.assign({}, query)),
    }),
    user: t.prismaField({
        type: 'User',
        nullable: true,
        args: {
            id: t.arg.int({ required: true }),
        },
        resolve: (query, _, { id }) => db_1.prisma.user.findUnique(Object.assign(Object.assign({}, query), { where: {
                id,
            } })),
    }),
}));
builder_1.builder.mutationFields((t) => ({
    // Ideally, I'd validate the schema
    createUser: t.prismaField({
        type: 'User',
        args: {
            data: t.arg({
                type: UserCreateInput,
                required: true,
            }),
        },
        resolve: (query, _, { data }) => db_1.prisma.user.create(Object.assign(Object.assign({}, query), { data })),
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
        resolve: (query, _, { data, id }) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const user = yield db_1.prisma.user.findUnique({
                where: { id: id },
            });
            if (!user) {
                throw new Error('Invalid user ID');
            }
            return db_1.prisma.user.update(Object.assign(Object.assign({}, query), { data: {
                    email: (_a = data.email) !== null && _a !== void 0 ? _a : user.email,
                    firstName: (_b = data.firstName) !== null && _b !== void 0 ? _b : user.firstName,
                    lastName: (_c = data.lastName) !== null && _c !== void 0 ? _c : user.lastName,
                    city: (_d = data.city) !== null && _d !== void 0 ? _d : user.city,
                }, where: { id: user === null || user === void 0 ? void 0 : user.id } }));
        }),
    }),
}));
