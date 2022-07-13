const request = require('supertest');
const { connectHandlers } = require('../src/app.js');

const appConfig = {
  resource: './public',
  db: './db/comments.json'
};

const app = connectHandlers(appConfig);

describe('Test App', () => {
  it('Should give 200 on GET /loginpage', (done) => {
    request(app)
      .get('/loginpage')
      .expect(200, done)
  });
});
