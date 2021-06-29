'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
    return queryInterface.bulkInsert('Users',
      [{
        name: 'Adamastor Solli',
        email: 'adamastor@gmail.com',
        password: 'admin',
        picture: 'https://www.areavip.com.br/wp-content/uploads/fotos/26319.jpg',
        phone: '(31) 98765-4321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Uriel Braga',
        email: 'urielbraga@hotmail.com',
        password: 'admin',
        picture: 'https://avatars3.githubusercontent.com/u/44574915?s=400&u=981a2f150b3d719732d1f02b23c350bb9636c3b0&v=4',
        phone: '(31) 98753-8282',
        createdAt: new Date(),
        updatedAt: new Date(),
      }], { logging: console.log })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};