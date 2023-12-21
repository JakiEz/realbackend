const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    phone:String,
    friends: [String],
    profileImage:Buffer,
    lastAuthentication: { type: Date, default: Date.now }
});

mongoose.model('User', userSchema);