const Poll = require("../models/polls");
const User = require("../models/users");

module.exports = {
    new: (req, res) => {
        let newPoll = new Poll();
        const pollId = newPoll._id;
        User.find({_id: req.user._id}, (err, users) => {
            const user = users[0];
            let polls = user.polls.slice();
            polls.push(pollId);
            user.polls = polls;
            user.save();
        });

        const body = req.body;
        newPoll.title = body.title;
        newPoll.date = new Date();
        let options = [];
        let i = 0;
        while (body[`option-${i}`]) {
            options.push(body[`option-${i}`]);
            i++;
        }
        newPoll.options = options;
        newPoll.save();

        res.redirect("/polls");
    },
    index: (req, res) => {
        Poll.find({}, {_id: 0}, (err, polls) => {
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
