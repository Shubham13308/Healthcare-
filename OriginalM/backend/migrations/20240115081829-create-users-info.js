'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      socialSecurity: {
        type: Sequelize.INTEGER
      },
      addressOne: {
        type: Sequelize.STRING
      },
      addressTwo: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      ZipCode: {
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      martialStatus: {
        type: Sequelize.STRING
      },
      social: {
        type: Sequelize.STRING
      },
      kids: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      isDeleted: {
        type: Sequelize.BOOLEAN
      },
      deletedAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('userInfos');
  }
};