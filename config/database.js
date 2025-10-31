const { Sequelize } = require('sequelize');
const config = require('./index');

const sequelize = new Sequelize(
  config.DB_NAME,
  config.DB_USER,
  config.DB_PASS,
  {
    host: config.DB_HOST,
    port: Number(config.DB_PORT || 5432),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  }
);

module.exports = { sequelize };
