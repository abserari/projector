'use strict';

module.exports = app => {
  app.resources('users', '/users', app.controller.user);
  app.router.post('/image', app.controller.image.index)
  app.router.post('/image/add', app.controller.image.add)
  app.router.post('/image/destroy', app.controller.image.destroy)
};
