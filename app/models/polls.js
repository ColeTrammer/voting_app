const mongoose = require("mongoose");

const Poll = new mongoose.Schema({
    title: String,
    options: [String],
    votes: [Number],
    data: Date,
});

module.exports = mongoose.model("Poll", Poll);
