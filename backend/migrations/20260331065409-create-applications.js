'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('applications', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
        job_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {
              model: "jobs",
              key: "id",
         },
        },
        job_seeker_id: {
         type: Sequelize.INTEGER,
         allowNull: false,
         references: {
              model: "users",
              key: "id",
         },
        },
        cover_letter: {
         type: Sequelize.TEXT,
         allowNull: true,
        },
        resume_url: {
         type: Sequelize.STRING,
         allowNull: false,
        },
        applied_date: {
         type: Sequelize.DATE,
         allowNull: false,
         defaultValue: Sequelize.NOW,
        },
        status: {
         type: Sequelize.ENUM("pending", "reviewed", "accepted", "rejected"),
         allowNull: false,
         defaultValue: "pending",
        },
        reviewed_at: {
         type: Sequelize.DATE,
         allowNull: true,
        },
        notes: {
         type: Sequelize.TEXT,
         allowNull: true,
        },
        created_at: {
         type: Sequelize.DATE,
         allowNull: false,
         defaultValue: Sequelize.NOW,
        },
        updated_at: {
         type: Sequelize.DATE,
         allowNull: false,
         defaultValue: Sequelize.NOW,
        },
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('applications');
  }
};
