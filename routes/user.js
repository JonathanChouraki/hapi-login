'use strict';

const Controller = require('../controllers/user.js');
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/api/signup',
        config: {
            handler: Controller.signup.handler,
            validate: {
                payload: {
                    email: Joi.string().email().required(),
                    first_name: Joi.string().min(2).max(20).required(),
                    last_name: Joi.string().min(2).max(20).required(),
                    password: Joi.string().min(3).max(20).required()
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/api/login',
        config: {
            handler: Controller.login.handler,
            auth: 'simple'
        }
    },
    {
        method: 'POST',
        path: '/api/reset/password',
        config: {
            handler: Controller.reset.handler,
            auth: 'simple',
            validate: {
                payload: {
                    old_password: Joi.string().min(3).max(20).required(),
                    new_password: Joi.string().min(3).max(20).required()
                }
            }
        }
    }
];
