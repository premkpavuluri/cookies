const { startServer } = require('myserver');
const { router } = require('./src/app.js');

startServer(80, router);
