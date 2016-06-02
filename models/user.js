'use strict';

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('user', {
        firstName:{
            type: DataTypes.STRING,
            field: 'first_name',
            allowNull: false
        },
        lastName:{
            type: DataTypes.STRING,
            field: 'last_name',
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};

