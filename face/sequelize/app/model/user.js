'use strict';

module.exports = app => {
  const { STRING, INTEGER, TEXT, DATE } = app.Sequelize;

  const User = app.model.define('user', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: STRING(20),
    nation: STRING(12),
    duty: STRING(),
    seat: STRING(24),
    performance: STRING(90),
    glory: TEXT,
    created_at: DATE,
    updated_at: DATE,
  });

  return User;
};
