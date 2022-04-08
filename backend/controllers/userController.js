const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// description: register user
// route: POST /api/users
// access: public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // check for required fields:
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('missing required field(s)');
    };

    // now check if user already exists:
    const userExists = await User.findOne({email});
    if (userExists) {
        res.status(400);
        throw new Error('user already exists');
    };

    // hash the password:
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the user:
    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    // check it was properly created:
    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('invalid user data')
    };
});

// description: authenticate user
// route: POST /api/login
// access: public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // check for user email:
    const user = await User.findOne({email});

    // use bcrypt method to compare request password to stored password:
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('invalid credentials');
    };
});

// description: get user
// route: GET /api/users/me
// access: private
const getMe = asyncHandler(async (req, res) => {
    // req.user.id should be accessible since this request has passed through
    // the authorization middleware:
    const { _id, name, email } = await User.findById(req.user.id);

    res.status(200).json({
        id: _id,
        name,
        email
    });
});

// function to generate & sign jwt token:
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
    registerUser,
    loginUser,
    getMe
};