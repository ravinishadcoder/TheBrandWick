const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
email: String,
password: String,
});

const User = new mongoose.model('user',userModel);

module.exports = User;