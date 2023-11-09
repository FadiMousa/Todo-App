const expressSession = require("express-session")
const sessionStore = require("connect-mongodb-session")(expressSession)

const store = new sessionStore({
  uri: "mongodb://localhost/TODOSAPP",
  collection: "sessions",
})

const session = {
  name: "auth",
  secret: "top secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
  store: store,
}

module.exports = expressSession(session)
