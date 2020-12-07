//Mark Sporich, Student #200399323
//Website: Classified Ads

const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

const User = new mongoose.Schema({
    username: String,
    password: String
})

User.plugin(plm);

module.exports = mongoose.model('User', User);