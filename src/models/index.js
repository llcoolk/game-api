const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  "dizpuuiq_llcoolk",
  "dizpuuiq_llcoolk",
  "llcoolk!", {
    host: "dionimercado.com",
    dialect: "mysql",
    port: 3306,
    operatorsAliases: false
  }
);

module.exports = sequelize;