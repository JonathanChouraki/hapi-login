'use strict';

const config = {
    server: {
        host: 'localhost',
        port: 3000
    },
    database: {
        host: '',
        username: '',
        password: '',
        database: 'happi-login',
        dialect: 'sqlite',
        storage: 'db.sqlite',
        recreate: true,
        logging: false
    }
};

module.exports = config;
