'use strict';

/**
 * Brings databases created with the original jobs migration in line with the
 * Job model. The checks keep this migration safe for new databases too.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('jobs');

    if (!columns.requirements) {
      await queryInterface.addColumn('jobs', 'requirements', {
        type: Sequelize.TEXT,
        allowNull: true,
      });
    }

    await queryInterface.sequelize.query(
      'ALTER TYPE "enum_jobs_job_type" ADD VALUE IF NOT EXISTS \'internship\';'
    );
  },

  async down() {
    // PostgreSQL enum values cannot be removed safely without rebuilding the
    // type, and removing a populated requirements column would lose data.
  },
};
