const request = require('supertest');
const { createApp } = require('../src/app.js');

const appConfig = {
  logger: (x) => x,
  resource: './public',
  db: './db/comments.json'
};

describe('Request on /badRequest', () => {
  it('Should give 404 on bad Request', (done) => {
    const app = createApp(appConfig, {}, {});

    request(app)
      .get('/badRequest')
      .expect('Not Found')
      .expect(404, done);
  });
});

describe('Request on /loginpage', () => {
  it('Should give loginpage on GET /loginpage.(no session)', (done) => {
    const app = createApp(appConfig, {}, {});

    request(app)
      .get('/loginpage')
      .expect('content-type', /html/)
      .expect('content-length', '257')
      .expect(200, done)
  });

  it('Should redirect to / on GET /loginpage when session present', (done) => {
    const sessions = { 1: { username: 'pk', sessionId: 1 } };
    const app = createApp(appConfig, sessions, {});

    request(app)
      .get('/loginpage')
      .set('Cookie', 'sessionId=1')
      .expect('location', '/')
      .expect('Already logged in')
      .expect(302, done);
  });
});
