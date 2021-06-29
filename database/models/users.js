'use strict';

const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define('Users', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: DataTypes.STRING,
        name: DataTypes.STRING,
        picture: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {});
    Users.associate = function (models) {
        // Users.hasMany(models.Contacts, { foreignKey: 'userFrom' });
        // associations can be defined here
    };
    sequelizePaginate.paginate(Users);
    // Users.sync({force: true})
    return Users;
};