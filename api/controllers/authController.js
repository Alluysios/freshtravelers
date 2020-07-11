const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');


exports.auth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('favorites', 'title');
        res.json(user);
    } catch(err) {
        console.log(err);
    }
}

exports.signup = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        });
    }

    try {
        const { firstname, lastname, email, password, passwordConfirm } = req.body;
        if(password !== passwordConfirm) {
            return res.status(400).json({ errors: [{ msg: 'Password are not same'}] });
        }
        const checkUser = await User.findOne({ email });
        if(checkUser) {
            return res.status(400).json({ errors: [{ msg: 'Email is already used '}] });
        }
        // Sign Up User
        const user = await User.create({
            firstname,
            lastname,
            email,
            password
        });
    
        const { _id } = user;
        // send token
        const token = jwt.sign({ _id } , process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES
        })
    
        res.status(201).json({token, user})
    } catch(err) {
        console.log(err);
        res.status(500).send('server error');
    }
}

exports.login = async(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()
        })
    }
    // check if field is not empty
    const { email, password } = req.body;
    if(!email || !password) {
        return res.status(400).json({ errors: [{ msg: 'password or email are required' }] });
    }

    // check if password and email is correct
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if(!user) {
        return res.status(401).json({ errors: [{ msg: 'Incorrect email or password' }] });
    }
    if(!await user.comparePassword(password, user.password)) {
        return res.status(401).json({ errors: [{ msg: 'Incorrect email or password' }] });
    }


    const { _id } = user;
    // sign token
    const token = jwt.sign({ _id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    })
    res.status(200).json({token, user})
}

// Middleware authorization
exports.protect = async(req, res, next) => {
    let token;

    if(req.header('Authorization')) {
        token = req.header('Authorization').split(' ')[1];
    }

    // Check if token exist
    if(!token) {
     return res.status(401).json({ msg: 'You are unauthorized'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        const currentUser = await User.findById(decoded._id).select('-password');

        req.user = currentUser;
        next();
    } catch(err) {
        res.status(401).json({ msg: 'Invalid token' })
    }
}

exports.onlyFor = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(401).json({ msg: 'You do not have the permission to perform this action'});
        }
        next();
    }
}