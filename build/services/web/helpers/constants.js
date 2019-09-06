"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultConnectionConfig = void 0;
const defaultConnectionConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  readOnlyUser: process.env.MYSQL_READONLY || 'readonly_user',
  writerUser: process.env.MYSQL_WRITER || 'writer_user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'default_database'
};
exports.defaultConnectionConfig = defaultConnectionConfig;