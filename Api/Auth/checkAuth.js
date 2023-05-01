const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    try {
        const { token } = req.body;
        let inU = jwt.verify(token, "ChatApp");
        req.tokenData = inU;
        next();
    } catch (error) {
        res.status(401).json({
            message: 'Auth failed' + error
        })
    }
}

module.exports = checkAuth;