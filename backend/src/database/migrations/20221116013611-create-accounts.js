'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('accounts', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '100,00'
      },
    },
    {
      timestamps: true,
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('accounts');

  }
};
