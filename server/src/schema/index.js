"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const fs_1 = require("fs");
const graphql_1 = require("graphql");
const path_1 = require("path");
const builder_1 = require("../builder");
require("./user");
exports.schema = builder_1.builder.toSchema({});
console.log({ ENV: process.env.DATABASE_URL });
(0, fs_1.writeFileSync)((0, path_1.resolve)(__dirname, '../../schema.graphql'), (0, graphql_1.printSchema)(exports.schema));
