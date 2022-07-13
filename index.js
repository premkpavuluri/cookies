const { startServer } = require('myserver');
const { createApp } = require('./src/app.js');

const appConfig = {
  logger: console.log,
  db: './db/comments.json',
  resource: './public'
}

const sessions = {};
const usersDb = {
  'pk': {
    username: 'prem'
  },
  'john': {
    username: 'Mr.john'
  }
};

const app = createApp(appConfig, sessions, usersDb);

startServer(80, app);
