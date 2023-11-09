const express = require("express")
const isAuth = require("../middleware/isAuth")
const todoModel = require("../models/todos")

const router = express.Router()

// const isAuth = (req, res, next) => {
//   // req.session.isAuth = true

//   if (req.session.isAuth) {
//     next()
//   } else {
//     res.redirect("/auth/login")
//   }
// }

router.use(isAuth)

router.get("/", isAuth, async (req, res) => {
  const todos = await todoModel.find({ username: req.session.username })
  res.render("index", { user: req.session.username, todos: todos })
})

router.post("/addtodo", isAuth, (req, res) => {
  const { todo } = req.body
  todoModel.create({
    todo: todo,
    done: false,
    username: req.session.username,
  })
  res.redirect("/")
})

router.get("/changetodostatus/:id", isAuth, async (req, res) => {
  const todo = await todoModel.findById(req.params.id)
  todo.done = !todo.done
  todo.save()
  res.redirect("/")
})

router.get("/edittodo/:id", isAuth, async (req, res) => {
  const todo = await todoModel.findById(req.params.id)
  if (todo) {
    const lines = todo.todo.split("\r\n").length
    res.render("edit", { todo: todo, numOfLines: lines })
  } else {
    return res.redirect("/")
  }
})

router.post("/edittodo/:id", isAuth, async (req, res) => {
  const todo = await todoModel.findById(req.params.id)
  todo.todo = req.body.todo
  todo.save()
  res.redirect("/")
})

router.get("/deletetodo/:id", async (req, res) => {
  await todoModel.findByIdAndDelete(req.params.id)
  res.redirect("/")
})

module.exports = router
