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
        name: 'Antônio',
        email: 'antonioaads@gmail.com',
        password: 'admin',
        picture: 'https://www.gravatar.com/avatar/94d093eda664ffdd6e450d7e9881bcad?s=32&d=identicon&r=PG',
        phone: '(31) 98765-4321',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Matheus Virus',
        email: 'matheuscoelho060@gmail.com',
        password: 'admin',
        picture: 'https://www.gravatar.com/avatar/94d093eda622addd6e450d7e9881bcad?s=32&d=identicon&r=PG',
        phone: '(31) 9529-1319',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Rogri God',
        email: 'rodrigodmoreira.rdm@gmail.com',
        password: 'admin',
        picture: 'https://www.gravatar.com/avatar/94d093eda664addd6e450deee881bcad?s=32&d=identicon&r=PG',
        phone: '(31) 97338-3999',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Coach Gz',
        email: 'guilhermegms209@gmail.com',
        password: 'admin',
        picture: 'https://www.gravatar.com/avatar/94d093eda664addd6e450d792181bcad?s=32&d=identicon&r=PG',
        phone: '(31) 98880-5011',
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