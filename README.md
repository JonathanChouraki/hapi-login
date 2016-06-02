# Hapi-Login
A basic user management system built with hapi

## Dependencies
This login system use a number of dependencies:
* hapi
* lab and code for testing
* joi for validation
* hapi-basic-auth for authentication
* sequelize ORM and the drivers for postgres, sqlite and mysql

## Architecture
I tried to create a 'real-world' architecture to break down the code in logical section.
* the application entry point in server.js in the root directory
* the routes folder contain the route configuration (method, path, validation) for each module
* the controllers folder contain the handler for each route
* the models folder contain the database connection and the tables modeling
* the lib folder contain the authentication script and is design to hold all the helper scripts
* the config folder hold the configuration for each environment
* the test folder contain all the tests

## Installation
* ensure that you have a database installed on you system (postgres, sqlite, or mysql).
* clone the repos
* install the dependencies `npm install`
* edit the configuration file to your liking (default environment is development)
* run the test `npm test`
* (optional) generate the code coverage report `npm run test-cov-html`
* run the server `npm start`

## Routes
#### Signup:
* method: 'POST'
* path: '/api/signup'
* accept: email, first_name, last_name, password
* return: first_name, last_name, password of the newly created user, 400 is parameters are missing or not valid, 500 if an error occurred

#### Login:
* method: 'POST'
* path: '/api/login/'
* accept: basic auth header generated with the email and password of the user
* return: first_name, last_name, email of the user, 401 if login failed, 500 if an error occurred

#### Reset password:
* method: 'POST'
* path: '/api/reset/password'
* accept: basic auth header generated with the email and password (optional if already logged), old_password, new_password
* return: 200 if password successfully updated, 401 if login failed, 500 if an error occurred

