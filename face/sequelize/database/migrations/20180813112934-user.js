'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, TEXT, STRING, DATE } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(20),
      nation: STRING(12),
      duty: STRING(),
      seat: STRING(24),
      performance: STRING(90),
      glory: TEXT,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};
