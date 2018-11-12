const pick = require('lodash/pick');

const schemaData = {
  user_id: {
    type: 'number',
    minimum: 1,
  },
  username: {
    type: 'string',
    minLength: 1
  },
  full_name: {
    type: 'string',
    minLength: 1
  },
  timestamp: {
    type: 'number',
    minimum: 1,
  }
};
const props = (...props) => pick(schemaData, props);

module.exports = {
  suscribers: {
    $jsonSchema: {
      bsonType: 'object',
      properties: props(
        'user_id', 'username', 'full_name',
        'timestamp'
      ),
      required: ['user_id', 'timestamp']
    }
  },
  actions: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        ...props(
        'user_id', 'full_name',
        'username', 'timestamp'
        ), 
        action: {
          type: 'string'
        },
      },
      required: ['action', 'user_id', 'timestamp']
    }
  },
  broadcast: {
    $jsonSchema: {
      bsonType: 'object',
      properties: {
        ...props(
          'user_id',
          'timestamp'
        ),
        msg_array: {
          type: 'array',
          minItems: 1,
          maxItems: 35 // gt of limit
        }
      },
      required: ['user_id', 'timestamp', 'msg_array']
    }
  }
};
