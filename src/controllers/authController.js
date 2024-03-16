const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

async function register(req, res) {
    const { username, email, password } = req.body;
    //check if user already exists
    const userEmail = await User
        .findOne({ email })
        .exec();
    if (userEmail) {
        return res.status(400).send('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        email,
        password: hashedPassword
    })

    await user.save();
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });


    if (!user) {
        return res.status(404).send('User not found');
    }

    const validPassowrd = await bcrypt.compare(password, user.password);

    if (!validPassowrd) {
        return res.status(400).send('Invalid password');
    }

    const token = jwt.sign({ id: user._id }, "your_jwt_secret_key_here");

    res.send({
        token,
        user
    });
}

module.exports = {
    register,
    login
}
