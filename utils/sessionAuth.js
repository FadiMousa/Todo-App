const expressSession = require("express-session")
const sessionStore = require("connect-mongodb-session")(expressSession)

const store = new sessionStore({
  uri: process.env.DATABASE_URL,
  collection: "sessions",
})

const session = {
  name: "auth",
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  },
  store: store,
}

module.exports = expressSession(session)
