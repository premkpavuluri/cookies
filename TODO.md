# Cookie.

- **TODO**
  - [ ] Inject the template the before server start.
  - [ ] update the remote repo's name.
  - [ ] Persist the session info.
  - [ ] Make register user(signUp).
  - [ ] Extract the flowerjar script in index.html
  - [ ] Pass the dependencies to handlers.

- **DONE:**
  - [x] Update the app with express framework.
  - [x] Use express body parser.
  - [x] Name handlers according to url.(/add-comment => addCommentHandler)
  - [x] Change loginpage to login.
  - [x] Use default not found handler.
  - [x] Change the name of the endpoints as kebab case.(ex: add-comment)
  - [x] Test the app with supertest package.
  - [x] Extract xhrReq function.
  - [x] Consider user validation in loginHandler.
  - [x] separate the loginPage and loginUser concern.
  - [x] post the comment against logged user.
  - [x] Make logout.
    - [x] clear the sessionId in sessions.
    - [x] Give expiration to client cookie.
  - [x] Connect the flowercatalog to login.
    - [x] show the guest book if login.
  - [x] show the home page if session is present.
