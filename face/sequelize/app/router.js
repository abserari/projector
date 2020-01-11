'use strict';

module.exports = app => {
  app.resources('users', '/users', app.controller.user);
  app.resources('image', '/image', app.controller.image);
  app.get('/face/add',app.controller.face.add);
};
