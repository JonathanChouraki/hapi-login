'use strict';

// TODO isolate each test by dynamically requiring server before each test. Create data as needed
const Lab = require('lab');
const Server = require('../server');
const Code = require('code');
const lab = exports.lab = Lab.script();

const basicHeader = function (username, password) {

    return 'Basic ' + (new Buffer(username + ':' + password, 'utf8')).toString('base64');
};

lab.before((done) => {

    Server.on('start', done);
});

lab.experiment('User signup', () => {

    lab.test('Signup return 200 when all parameters are valid', (done) => {

        const options = {
            method: 'POST',
            url: '/api/signup',
            payload: {
                email: 'jonathan.chouraki@gmail.com',
                first_name: 'Jonathan',
                last_name: 'Chouraki',
                password: 'sEcretPassw0rd'
            }
        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('Signup return 400 when a parameter is invalid', (done) => {

        const options = {
            method: 'POST',
            url: '/api/signup',
            payload: {
                email: 'jonathan',
                first_name: 'Jonathan',
                last_name: 'Chouraki',
                password: 'sEcretPassw0rd'
            }
        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(400);
            done();
        });
    });

    lab.test('Signup return 400 when payload is missing', (done) => {

        const options = {
            method: 'POST',
            url: '/api/signup'
        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(400);
            done();
        });
    });
});

lab.experiment('User login', () => {

    lab.test('Login return 200 when parameters are valid', (done) => {

        const options = {
            method: 'POST',
            url: '/api/login',
            headers: {
                authorization: basicHeader('jonathan.chouraki@gmail.com', 'sEcretPassw0rd')
            }

        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('Login return 401 when password is invalid', (done) => {

        const options = {
            method: 'POST',
            url: '/api/login',
            headers: {
                authorization: basicHeader('jonathan.chouraki@gmail.com', 'badPassword')
            }

        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(401);
            done();
        });
    });

    lab.test('Login return 401 when user does\'nt exist', (done) => {

        const options = {
            method: 'POST',
            url: '/api/login',
            headers: {
                authorization: basicHeader('jonathan@gmail.com', 'sEcretPassw0rd')
            }

        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(401);
            done();
        });
    });

    lab.test('Login return 401 when no email is given', (done) => {

        const options = {
            method: 'POST',
            url: '/api/login',
            headers: {
                authorization: basicHeader('', 'sEcretPassw0rd')
            }

        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(401);
            done();
        });
    });
});

lab.experiment('User reset password', () => {

    lab.test('Reset password return 200 when all parameters are valid', (done) => {

        const options = {
            method: 'POST',
            url: '/api/reset/password',
            payload: {
                //todo isolate the test to have a different password here
                old_password: 'sEcretPassw0rd',
                new_password: 'newPassw0rd'
            },
            headers: {
                authorization: basicHeader('jonathan.chouraki@gmail.com', 'sEcretPassw0rd')
            }
        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(200);
            done();
        });
    });

    lab.test('Reset password return 400 when the given old password is wrong', (done) => {

        const options = {
            method: 'POST',
            url: '/api/reset/password',
            payload: {
                //todo isolate the test to have a different password here
                old_password: 'badPassw0rd',
                new_password: 'newPassw0rd'
            },
            headers: {
                authorization: basicHeader('jonathan.chouraki@gmail.com', 'sEcretPassw0rd')
            }
        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(401);
            done();
        });
    });

    lab.test('Reset password return 401 when password is wrong', (done) => {

        const options = {
            method: 'POST',
            url: '/api/reset/password',
            payload: {
                //todo isolate the test to have a different password here
                password: 'sEcretPassw0rd'
            },
            headers: {
                authorization: basicHeader('jonathan.chouraki@gmail.com', 'badPassword')
            }
        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(401);
            done();
        });
    });

    lab.test('Reset password return 401 when no email is given', (done) => {

        const options = {
            method: 'POST',
            url: '/api/reset/password',
            payload: {
                password: 'sEcretPassw0rd'
            },
            headers: {
                authorization: basicHeader('', 'sEcretPassw0rd')
            }

        };

        Server.inject(options, (response) => {

            Code.expect(response.statusCode).to.equal(401);
            done();
        });
    });
});
