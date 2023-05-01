const mongoose = require("mongoose");
const task = mongoose.Schema({
    user: String,
    Tasks: [{
        taskName: String,
        description: String,
        priority: String,
        timeStart: String,
        timeEnd: String
    }],

})

module.exports = mongoose.model('Task', task);



