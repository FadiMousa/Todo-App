const express = require("express")
const bcrypt = require("bcryptjs")
const userModel = require("../models/users")

const router = express.Router()

router.get("/signup", (req, res) => {
  res.render("signup", { error: "" })
})

router.post("/signup", async (req, res) => {
  const { username, password } = req.body
  const ifUser = await userModel.findOne({ username })
  if (ifUser) {
    return res.render("signup", { error: "User already exists !!" })
  } else {
    const hash = await bcrypt.hash(password, 10)
    userModel.create({ username, password: hash })
    return res.redirect("/login")
  }
})

router.get("/login", (req, res) => {
  res.render("login", { error: "" })
})

router.post("/login", async (req, res) => {
  const { username, password } = req.body
  const user = await userModel.findOne({ username })
  if (!user) {
    return res.render("login", { error: "Invalid credentials" })
  } else {
    const deHash = await bcrypt.compare(password, user.password)
    if (!deHash) {
      return res.render("login", { error: "Invalid credentials" })
    } else {
      req.session.isAuth = true
      req.session.username = user.username
      return res.redirect("/")
    }
  }
})

router.post("/logout", (req, res) => {
  req.session.destroy()
  res.redirect("/auth/login")
})

module.exports = router
