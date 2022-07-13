const { startServer } = require('myserver');
const { connectHandlers } = require('./src/app.js');

const appConfig = {
  db: './db/comments.json',
  resource: './public'
}

const app = connectHandlers(appConfig)

startServer(80, app);
