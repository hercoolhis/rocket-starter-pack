const jwt = require('jsonwebtoken'),
{ secret } = require('../../config');


const checkAndValidateToken = async (req, res, next) => {    
   
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    
    if (token) {
        if (token.startsWith('Bearer ')) {
            // Remove Bearer from string
            token = token.slice(7, token.length);
        }
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }

}

module.exports = checkAndValidateToken;