'use strict';

const Bcrypt = require('bcrypt');
const Models = require('../models');
const User = Models.User;
const saltRound = 10;


module.exports = {
    signup: {
        handler: (request, reply) => {

            const hash = Bcrypt.hashSync(request.payload.password, saltRound);
            User.create({
                firstName: request.payload.first_name,
                lastName: request.payload.last_name,
                email: request.payload.email,
                password: hash
            })
            .then((user) => {

                reply({
                    first_name: user.firstName,
                    last_name: user.lastName,
                    password: user.password
                }).code(200);
            },
            (err) => {

                // payload is already validated by Joi, so it's must be a server error, statusCode 500
                // but it's not certain
                // TODO: better error handling and find a way to reliably test this
                console.log(err);
                reply().code(500);
            });
        }
    },

    login: {
        handler: (request, reply) => {

            User.findById(request.auth.credentials.id)
                .then((user) => {

                    reply({
                        first_name: user.firstName,
                        last_name: user.lastName,
                        email: user.email
                    });
                },
                (err) => {

                    console.log(err);
                    reply().code(500);
                });
        }
    },

    reset: {
        handler: (request, reply) => {

            User.findById(request.auth.credentials.id)
                .then((user) => {

                    Bcrypt.compare(request.payload.old_password, user.password, (err, res) => {

                        if (!err) {
                            const hash = Bcrypt.hashSync(request.payload.new_password, saltRound);
                            user.password = hash;
                            user.save()
                                .then(() => {

                                    reply().code(200);
                                }, (err) => {

                                    console.log(err);
                                    reply().code(500);
                                });
                        }
                        else {
                            reply().code(400);
                        }
                    });
                });
        }
    }
};
