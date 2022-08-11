First, you should create a file named `.env` in the folder of `Bloglist`, where you should set environment variable `MONGODB_URI`, `PORT`, `TEST_MONGODB_URI`, and `SECRET`.
<br />
Then, you can run `npm test` to test.

As to `user_api.test.js` and `blog_api.test.js`, we have to ensure that `user_api.test.js` runs first, then we can run blog_api.testing.js, because the test database and the actual database are the same one, user created in `user_api.test.js` is needed in `blog_api.test.js`