'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await   queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER

      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
       },
      role: {
        type: Sequelize.ENUM('employer', 'jobseeker'),
        allowNull: false
       },
      company_name: {
        type: Sequelize.STRING,
        allowNull: true
        },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
       },
       is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
       }
      })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
