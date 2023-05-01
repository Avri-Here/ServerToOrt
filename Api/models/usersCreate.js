const mongoose = require("mongoose");
const UserSchem = mongoose.Schema({
    userName: { type: String, maxLength: 22, required: true },
    password: { type: String, required: true },
    photoUser: { type: String },
    regTime: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Users', UserSchem);
