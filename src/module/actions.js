const mongo = require('../lib/mongodb');

const actionModel = mongo.collection('actions');

class Actions {
  static create({
    action = 'default event',
    userId,
    fullName,
    username,
  }) {
    return actionModel.insert({
      action,
      user_id: userId,
      full_name: fullName,
      username,
      timestamp: new Date().getTime()
    });
  }
}

module.exports = Actions;
