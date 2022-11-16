'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      debitedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'accounts', key: 'id' }
      },
      creditedAccountId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model:'accounts', key: 'id' }
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    },
    {
      timestamps: true,
      createdAt: true,
      updatedAt: false,
    });
  },

  async down (queryInterface, Sequelize) {

    await queryInterface.dropTable('transactions');
  }
};
