const mongoose = require('mongoose');

const todoScheme = new mongoose.Schema({
  title: String,
  userId: String,
  completed: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: {
      createdAt: 'created_at'
    },
  }
);

module.exports = mongoose.model('Todo', todoScheme);