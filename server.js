const express = require("express")
const mongoose = require("mongoose")

const session = require("./utils/sessionAuth")

const authRoute = require("./routes/auth")
const todosRoute = require("./routes/todos")

const app = express()

app.use(express.static("puplic"))
app.use(express.urlencoded({ extended: false }))

app.set("view engine", "ejs")

//Session
app.use(session)

// Routes
app.use("/auth", authRoute)
app.use("/", todosRoute)

mongoose.connect("mongodb://localhost/TODOSAPP")

app.get("*", (req, res) => {
  res.send("404 - Page not found !!")
})

app.use((err, req, res, next) => {
  if (err) {
    res.send("Server error !!")
  }
})

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
