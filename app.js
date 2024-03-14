const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');

const app = express();

require('dotenv').config();

mongoose.connect("mongodb://localhost:27017/todo_app", { useNewUrlParser: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err));

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is running on port ${port}`));