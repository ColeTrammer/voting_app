const mongoose = require("mongoose");

const User = new mongoose.Schema({
    github: {
        id: String,
        displayName: String,
        username: String
    }
});

module.exports = mongoose.model("User", User);
