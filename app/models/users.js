const mongoose = require("mongoose");

const User = new mongoose.Schema({
    github: {
        id: String,
        displayName: String,
        username: String
    },
    polls: [mongoose.Schema.Types.ObjectId],
    votedOn: [mongoose.Schema.Types.ObjectId]
});

module.exports = mongoose.model("User", User);
