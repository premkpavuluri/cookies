const { createApp } = require('./src/app.js');

const sessions = { 1: { username: 'pk', sessionId: 1 } };

const users = {
  'pk': {
    username: 'prem'
  },
  'ankamma': {
    username: 'Ankamma rao'
  },
  'swap': {
    username: 'Swapnil'
  },
  'tanmay': {
    username: 'Tanmay'
  }
};

const appConfig = {
  logger: console.log,
  db: './db/comments.json',
  resource: './public/'
};

const app = createApp(appConfig, sessions, users);

app.listen(80, () => console.log('Server listening on port:80'));
