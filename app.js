const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const todoRoutes = require('./src/routes/todoRoutes');
const cors = require('cors')
const app = express();
app.use(cors())
require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/todo_app",)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/todo', todoRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
