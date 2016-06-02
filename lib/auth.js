'use strict';

const Bcrypt = require('bcrypt');
const Models = require('../models/');
const User = Models.User;

const validate = (request, email, password, callback) =>  {

    User.findOne({
        where: {
            email: email
        }
    })
    .then((user) => {

        if (!user){
            return callback(null, false);
        }

        Bcrypt.compare(password, user.password, (err, isValid) => {

            callback(err, isValid, { id: user.id, name: user.email });
        });
    }, (err) => {

        callback(err, false);
    });
};

module.exports.validate = validate;
