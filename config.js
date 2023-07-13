const { PORT = 3000 } = process.env;
// const DB_URL = 'mongodb://127.0.0.1:27017/mestodb';
const DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  PORT,
  DB_URL,
};
