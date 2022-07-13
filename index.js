const { startServer } = require('myserver');
const { createApp } = require('./src/app.js');

const appConfig = {
  logger: console.log,
  db: './db/comments.json',
  resource: './public'
}

const sessions = {};
const users = {
  'pk': {
    username: 'prem'
  },
  'john': {
    username: 'Mr.john'
  }
};

const app = createApp(appConfig, sessions, users);

startServer(80, app);
