'use strict';

module.exports = appInfo => {
  const config = {};

  // should change to your own
  config.keys = appInfo.name + '_sequelize-example';

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'egg-sequelize-example-dev',
    host: '127.0.0.1',
    port: 3306,
    password: '123456'
  };

  // add your config here
  config.security = {
    csrf: {
      enable: false,
    },
  };
  
  config.cors = {
    origin: '*',//匹配规则  域名+端口  *则为全匹配
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  return config;
};
