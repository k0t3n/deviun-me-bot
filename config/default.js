module.exports = {
  bot: {
    username: '',
    accessToken: '',
    adminId: null,
    handler: require('./handler'),
    middleware: require('./middleware')
  },
  notificationChannel: {
    id: 0
  },
  lang: require('./lang'),
  defaultLocale: 'ru',
  mongodb: {
    hostname: 'localhost',
    port: 27017,
    user: null,
    password: null,
    db: null
  },
  redis: {
    hostname: 'localhost',
    port: 6379
  }
};
