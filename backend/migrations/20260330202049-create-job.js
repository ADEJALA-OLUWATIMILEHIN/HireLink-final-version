'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('jobs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      employer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
       },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      company: {
        type: Sequelize.STRING,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      },
     job_type: {
        type: Sequelize.ENUM('full-time', 'part-time', 'contract'),
        allowNull: false
       },
      location_type: {
        type: Sequelize.ENUM('remote', 'on-site', 'hybrid'),
        allowNull: false
       },
     salary_min: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      salary_max: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      posted_at: {
        type: Sequelize.DATE,
        allowNull: false, 
        defaultValue: Sequelize.NOW
      },
      expires_at: {
        type: Sequelize.DATE, 
        allowNull: true
      },
      is_active:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
},
      view_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
        },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('jobs');
  }
};

