'use strict';

const Sequelize = require('sequelize');
const Config = require('../config/' + process.env.NODE_ENV);

const sequelize = new Sequelize(Config.database.database, Config.database.username, Config.database.password, {
    host: Config.database.host,
    dialect: Config.database.dialect,
    logging: Config.database.logging,
    storage: './models/' + Config.database.storage
});

module.exports.User = sequelize.import('./user');
module.exports.sequelize = sequelize;
