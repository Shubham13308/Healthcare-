// migration
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('userpreferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      languages: {
        type: Sequelize.STRING
      },
      breakfast: {
        type: Sequelize.STRING
      },
      lunch: {
        type: Sequelize.STRING
      },
      dinner: {
        type: Sequelize.STRING
      },
      waketime: {
        type: Sequelize.STRING
      },
      bedtime: {
        type: Sequelize.STRING
      },
      height: {
        type: Sequelize.STRING
      },
      weight: {
        type: Sequelize.STRING
      },
      bloodGlucose: {
        type: Sequelize.STRING
      },
      bloodPressure: {
        type: Sequelize.STRING
      },
      Cholestrol: {
        type: Sequelize.STRING
      },
      distance: {
        type: Sequelize.STRING
      },
      communication: {
        type: Sequelize.JSON // Use Sequelize.JSON here
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
    await queryInterface.dropTable('userpreferences');
  }
};
