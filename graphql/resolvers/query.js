const { models } = require('../../models');

module.exports = {
  event (root, { id }, context) {
    return models.Event.findById(id, {});
  },
  events (root, args, context) {
    return models.Event.findAll({});
  },
  user (root, { id }, context) {
    return models.User.findById(id, {});
  },
  users (root, args, context) {
    return models.User.findAll({});
  },
  room (root, { id }, context) {
    return models.Room.findById(id);
  },
  rooms (root, args, context) {
    return models.Room.findAll({});
  }
};
