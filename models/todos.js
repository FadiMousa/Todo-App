const mongoose = require("mongoose")

const todosSchema = new mongoose.Schema({
  todo: String,
  done: Boolean,
  username: String,
})

const todos = new mongoose.model("todos", todosSchema)

module.exports = todos
