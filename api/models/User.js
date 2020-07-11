const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'Must have a firstname']
    },
    lastname: {
        type: String,
        required: [true, 'Must have a lastname']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Must have an email']
    },
    password: {
        type: String,
        required: [true, 'Password required'],
        min: 6,
        max: 32
    },
    role: {
        type: String,
        enum: ['user', 'subscriber', 'admin'],
        default: 'user'
    },
    favorites: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Blog'
        }
    ],
    image: String,
    date: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.comparePassword = async function(enteredPassword, userPassword) {
    return await bcrypt.compare(enteredPassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;