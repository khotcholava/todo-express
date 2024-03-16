
const User = require('../models/userModel');
async function getUserProfile(req, res) {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({
            username: user.username,
            email: user.email
        })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUserList(req, res) {
    try {
        const users = await User.find({});

        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getUserProfile,
    getUserList
}