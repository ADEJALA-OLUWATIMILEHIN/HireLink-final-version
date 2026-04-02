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
    await queryInterface.createTable('bookmarks', {
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
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    },
); 
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('bookmarks');
}
}
