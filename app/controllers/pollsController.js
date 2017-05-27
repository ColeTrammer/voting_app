const Poll = require("../models/polls")

module.exports = {
    new: (req, res) => {
        const body = req.body;
        let newPoll = new Poll();
        newPoll.title = body.title;
        newPoll.date = new Date();
        let options = [];
        let i = 0;
        while (body[i]) {
            options.push(body[i]);
            i++;
        }
        newPoll.options = options;
        newPoll.save();
        res.redirect("/polls");
    },
    index: (req, res) => {
        Poll.find({}, (err, polls) => {
            res.render("polls", {polls: polls});
        });
    },
    getNewForm: (req, res) => {
        res.render("polls/new");
    },
    show: (req, res) => {
        Poll.find({}, (err, polls) => {
            if (req.params.id >= 0 && req.params.id < polls.length)
                res.render("polls/show", {poll: polls[req.params.id]});
            else
                res.redirect("/polls");
        });
    }
};
