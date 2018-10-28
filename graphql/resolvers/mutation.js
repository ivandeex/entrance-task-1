const { models } = require('../../models');

module.exports = {
  // User
  createUser (root, { input }, context) {
    return models.User.create(input).then(user => user);
  },

  updateUser (root, { id, input }, context) {
    return models.User.findById(id)
            .then(user => user.update(input)).then(user => user);
  },

  removeUser (root, { id }, context) {
    return models.User.findById(id)
            .then(user => user.destroy().then(() => user));
  },

  // Room
  createRoom (root, { input }, context) {
    return models.Room.create(input)
            .then(room => room);
  },

  updateRoom (root, { id, input }, context) {
    return models.Room.findById(id)
            .then(room => room.update(input).then(room => room));
  },

  removeRoom (root, { id }, context) {
    return models.Room.findById(id)
            .then(room => room.destroy().then(() => room));
  },

  // Event
  createEvent (root, { input, usersIds, roomId }, context) {
    return Promise.all([
      models.Event.create(input),
      models.User.findAll({ where: { id: usersIds }}),
      models.Room.findById(roomId)
    ]).then(([event, users, room]) => Promise.all([
                                        event.setRoom(room),
                                        event.setUsers(usersIds),
                                      ]).then(() => event));
  },

  updateEvent (root, { id, input }, context) {
    return models.Event.findById(id)
            .then(event => event.update(input).then(event => event));
  },

  addUserToEvent (root, { id, userId }, context) {
    return Promise.all([
              models.Event.findById(id),
              models.User.findById(userId),
            ]).then(([event, user]) => event.addUser(user).then(() => event));
  },

  removeUserFromEvent (root, { id, userId }, context) {
    return Promise.all([
              models.Event.findById(id),
              models.User.findById(userId),
            ]).then(([event, user]) => event.removeUser(user).then(() => event));
  },

  changeEventRoom (root, { id, roomId }, context) {
    return Promise.all([
              models.Event.findById(id),
              models.Room.findById(roomId),
            ]).then(([event, room]) => event.setRoom(room).then(event => event));
  },

  removeEvent (root, { id }, context) {
    return models.Event.findById(id)
            .then(event => event.destroy().then(() => event));
  }
};
