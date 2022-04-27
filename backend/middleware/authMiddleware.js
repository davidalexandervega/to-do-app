const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// this middleware protects any private routes:
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // check that the auth is in the header and that it's a bearer token:
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // get the token from the bearer header, 
            // as it is in the format 'Bearer {token}':
            token = req.headers.authorization.split(' ')[1];

            // verify the token:
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // get the user from the token
            // in userController.js, the user id is set as the token's
            // payload, so it exists here in the token received.
            // collect the user object using the id, leaving out the password:
            req.user = await User.findById(decoded.id).select('-password');

            next()
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('not authorized');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('not authorized, no token');
    }
});

module.exports = { protect };