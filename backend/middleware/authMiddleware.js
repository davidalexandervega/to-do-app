const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

// this middleware function protects any private routes:
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // checks that the auth is in the header and that it's a bearer token:
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // gets the token from the bearer header.
            // we're splitting at the space in the header and taking
            // the second argument (the token) from the resultant array:
            token = req.headers.authorization.split(' ')[1];

            // verifies the token:
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // gets the user from the token.
            // in userController.js, the user id is set as the token's
            // payload, so it exists here in the token we got.
            // the hashed password is in the user object, so we cut it out here:
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