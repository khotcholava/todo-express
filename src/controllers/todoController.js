const Todo = require('../models/todoModel');

async function getTodoList(req, res) {
  const { id } = req.user
  const { completed, title } = req.query
  let query = { userId: id };

  try {
    if (title) {
      const titleRegex = new RegExp(title, 'i')
      query.title = titleRegex;
    }
    if (completed !== undefined) {
      query.completed = completed;
    }

    const todos = await Todo.find(query);

    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function createTodo(req, res) {
  const { title } = req.body
  const { id } = req.user
  const todo = new Todo({
    title,
    userId: id
  })
  const foundTodo = await Todo.findOne({ title })

  if (foundTodo?._id) {
    return res.status(404).json({
      message: "Todo already exists"
    })
  }

  try {
    const newTodo = await todo.save();

    res.status(201).json({
      message: "Todo created",
      todo: newTodo
    })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

async function updateTodo(req, res) {
  const { id } = req.params
  const user = req.user

  try {
    const todo = await Todo.findOne({ _id: id, userId: user.id })
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found"
      })
    }

    todo.completed = req.body.completed

    const updatedTodo = await todo.save()

    res.json(updatedTodo)
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports = {
  getTodoList,
  createTodo,
  updateTodo
}