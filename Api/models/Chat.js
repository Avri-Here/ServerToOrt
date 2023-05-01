const mongoose = require("mongoose");
const Chat = mongoose.Schema({
    users: String,
    messages: [{ from: String, messages: String, timeMass: String, isRead: { type: Boolean, default: false } }],
    regTime: { type: Date, default: Date.now },


})

module.exports = mongoose.model('Chat', Chat);
