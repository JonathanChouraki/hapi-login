'use strict';

if (process.env.NODE_ENV === undefined){
    process.env.NODE_ENV = 'development';
}

const Hapi = require('hapi');
const Routes = require('./routes');
const server = new Hapi.Server();
const Auth = require('./lib/auth');
const Config = require('./config/' + process.env.NODE_ENV + '.js');
const Sequelize = require('./models');

server.connection({
    port: Config.server.port,
    host: Config.server.host
});

Sequelize.sequelize.sync({
    force: Config.database.recreate,
    logging: Config.database.logging
})
.then(() => {

    server.register(require('hapi-auth-basic'), (err) => {

        if (err){
            throw err;
        }
        server.auth.strategy('simple', 'basic', { validateFunc: Auth.validate });
        server.route(Routes);
    });

    server.start((err) => {

        if (err) {
            throw err;
        }
        console.log('Server running at:', server.info.uri);
    });

})
.catch((err) => {

    console.log('error:', err);
});

module.exports = server;
