'use strict';
const {faker} = require('@faker-js/faker');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    /** Tramite la libreria faker (che crea dato fake), popoliamo il DB con 50 record di User */
    for (let i = 0; i < 50; i++) {
      await queryInterface.bulkInsert('users', [{
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {});
    }

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
