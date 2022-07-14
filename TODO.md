# Cookie.

- **TODO**
  - [ ] Update the app with express framework.
  - [ ] Inject the template the before server start.
  - [ ] Change the name of the endpoints as kebab case.(ex: add-comment)
  - [ ] Name handlers according to Endpoints.(/add-comment => addCommentHandler)
  - [ ] update the remote repo's name.
  - [ ] Persist the session info.
  - [ ] Make register user(signUp).

- **DONE:**
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
