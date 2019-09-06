export const defaultConnectionConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  readOnlyUser: process.env.MYSQL_READONLY || 'readonly_user',
  writerUser: process.env.MYSQL_WRITER || 'writer_user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'default_database',

};
