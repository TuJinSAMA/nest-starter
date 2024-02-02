const { DataSource } = require('typeorm');
const { parsed: config } = require('dotenv').config({
  path: `.env.stage.prod`,
});
module.exports = new DataSource({
  type: 'mysql',
  synchronize: false,
  host: config['DB_HOST'],
  port: config['DB_PORT'],
  username: config['DB_USERNAME'],
  password: config['DB_PASSWORD'],
  database: config['DB_DATABASE'],
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
});
