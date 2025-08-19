const jwt = require('jsonwebtoken');

const SECRET = 'abc@123';

// jwt middlewar to authenticate the user
const authenticateJwt = (req, res, next) => {
    
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, data) => {
            if (err) {
                return res.status(401).json({ message: "jwt token expired" });
            }
            next();
        });
    } else {
        return res.status(401).json({ message: "Authorization header missing" });
    }
};

module.exports = { authenticateJwt, SECRET };