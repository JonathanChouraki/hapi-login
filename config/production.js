'use strict';

const config = {
    server: {
        host: 'localhost',
        port: 3000
    },
    database: {
        host: 'localhost',
        username: 'postgres',
        password: 'postgres',
        database: 'happi-login',
        dialect: 'postgres',
        recreate: false,
        logging: false
    }
};

module.exports = config;
