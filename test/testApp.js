const assert = require('assert');
const request = require('supertest');
const { createApp } = require('../src/app.js');

const appConfig = {
  logger: (x) => x,
  resource: './public',
  db: './db/comments.json'
};

describe('GET /badRequest', () => {
  it('Should give 404 on bad Request', (done) => {
    const app = createApp(appConfig, {}, {});

    request(app)
      .get('/badRequest')
      .expect('Not Found')
      .expect(404, done);
  });
});

describe('GET /loginpage', () => {
  it('Should give loginpage on GET /loginpage.(no session)', (done) => {
    const app = createApp(appConfig, {}, {});

    request(app)
      .get('/loginpage')
      .expect('content-type', /html/)
      .expect('content-length', '364')
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

describe('POST /login', () => {
  it('Should create session for user if valid, on POST /login', (done) => {
    const sessions = {}
    const users = { pk: { username: 'prem' } };
    const app = createApp(appConfig, sessions, users);

    request(app)
      .post('/login')
      .send('username=pk')
      .expect('Welcome pk')
      .expect(200, done)
  });

  it('Should redirect to loginpage if user is not valid.', (done) => {
    const sessions = {};
    const users = { pk: { username: 'prem' } };
    const app = createApp(appConfig, sessions, users);

    request(app)
      .post('/login')
      .send('username=unknown')
      .expect('Invalid credentials')
      .expect(401, done)
  });
});

describe('GET /guestbook', () => {
  let app;
  beforeEach(() => {
    appConfig.db = './test/testData/db/comments.json';
    const sessions = { 1: { username: 'prem', sessionId: 1 } };
    app = createApp(appConfig, sessions, {});
  });

  it('Should redirect to loginpage if not login, on GET /guestbook', (done) => {
    request(app)
      .get('/guestbook')
      .expect('location', '/loginpage')
      .expect('Access denied.')
      .expect(302, done)
  });

  it('Should serve the guestbook if login, on GET /guestbook', (done) => {
    request(app)
      .get('/guestbook')
      .set('Cookie', 'sessionId=1')
      .expect('content-type', /html/)
      .expect(/<title>Guest Book<\/title>/)
      .expect(200, done);
  });
});

describe('POST /logcomment', () => {
  beforeEach(() => {
    appConfig.db = './test/testData/db/comments.json';
    const sessions = { 1: { username: 'prem', sessionId: 1 } };
    app = createApp(appConfig, sessions, {});
  });

  it('Should add the comment on POST /logcomment', (done) => {
    request(app)
      .post('/logcomment')
      .send('comment=hello world')
      .set('Cookie', 'sessionId=1')
      .expect('success')
      .expect(201, done)
  });
});

describe('GET /comments', () => {
  beforeEach(() => {
    const sessions = { 1: { username: 'prem', sessionId: 1 } };
    app = createApp(appConfig, sessions, {});
  });

  it('Should serve the comments json', (done) => {
    request(app)
      .get('/comments')
      .set('Cookie', 'sessionId=1')
      .expect('content-type', /json/)
      .expect(200, done)
  });
});

describe('GET /logout', () => {
  beforeEach(() => {
    const sessions = { 1: { username: 'prem', sessionId: 1 } };
    app = createApp(appConfig, sessions, {});
  });

  it('Should expire the cookie and remove the session', (done) => {
    request(app)
      .get('/logout')
      .set('Cookie', 'sessionId=1')
      .expect('location', '/loginpage')
      .expect('Logout')
      .expect(302)
      .end((err, res) => {
        const actual = res.header['set-cookie'];
        assert.deepStrictEqual(actual, ['sessionId=1;Max-Age=0']);
        done(err);
      });
  });
});
