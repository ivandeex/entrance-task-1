const Sequelize = require('sequelize');

const scheme = require('./scheme');

const Op = Sequelize.Op;

const sequelize = new Sequelize(null, null, null, {
  dialect: 'sqlite',
  storage: 'db.sqlite3',
  operatorsAliases: false,
  logging: false
});

scheme(sequelize);
sequelize.sync();

module.exports.sequelize = sequelize;
module.exports.models = sequelize.models;
