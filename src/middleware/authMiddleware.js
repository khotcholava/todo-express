const jwt = require('jsonwebtoken');

function verifyToken(req, res ,next) {
    const token = (req.headers['authorization']).replace('Bearer ', '');
    console.log(token);
    if(!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, "your_jwt_secret_key_here");
        req.user = decoded;
        next()
    } catch(err) {
        return res.status(401).send('Invalid Token');
    }
}

module.exports = {
    verifyToken
};